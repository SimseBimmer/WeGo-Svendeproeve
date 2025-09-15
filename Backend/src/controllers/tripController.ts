import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { toBoolean } from '../utils/formatter.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.trip.findMany({
      select: {
        id: true,
        departureDate: true,
        cityDeparture: true,
        addressDeparture: true,
        cityDestination: true,
        addressDestination: true,
        pricePerSeat: true,
        bagSizeId: true,
        useFerry: true,
        isElectric: true,
        hasComfort: true,
        allowChildren: true,
        allowSmoking: true,
        allowMusic: true,
        allowPets: true,
        seatsTotal: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            imageUrl: true,
            reviewsRecieved: {
              select: {
                numStars: true
              }
            }
          }
        },
        bookings: { 
          select: { 
            numSeats: true 
          } 
        },
      },
      orderBy: {
        departureDate: 'asc'
      }
    });

    // Beregner antal ledige pladser + tildelte stjerner
    const result = data.map(({ bookings, user, ...t }) => {      
      const seatsBooked = bookings.reduce((sum,b) => sum + b.numSeats, 0)

      const reviews = user.reviewsRecieved ?? [];

      const { numStars, numReviews } = (reviews ?? []).reduce(
        (acc: { numStars: number; numReviews: number }, r) => {
          const n = Number((r as any)?.numStars)
          const val = Number.isFinite(n) ? Math.max(0, Math.min(5,n)) : 0
          acc.numStars += val
          acc.numReviews += 1
          return acc
        }, { numStars: 0, numReviews: 0 }
      );

      const avgStars = numReviews > 0 ? numStars / numReviews : 0;

      const { reviewsRecieved, ...userRest } = user;
      return { ...t, seatsBooked, user: { ...userRest, numReviews, numStars, avgStars } };

    })

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.trip.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: {
            firstname: true,
            lastname: true,
            imageUrl: true,
            description: true
          }
        },
        bagsize: {
          select: {
            name: true,
            description: true,
            iconUrl: true
          }
        },
        bookings: {
          select: {
            id: true,
            numSeats: true,
            user: {
              select: {
                id: true,
                firstname: true,
                imageUrl: true
              }
            }
          }
        }
      }
    });

    if (!data) res.status(404).json({ error: 'Trip not found' });

    const reviews = await prisma.review.aggregate({
      where: {
        reviewedUserId: Number(data?.userId)
      },
      _count: {
        _all: true
      },
      _sum: {
        numStars: true
      }
    })

    const numReviews = reviews._count._all
    const numStars = reviews?._sum.numStars ?? 0
    const avgStars = numStars / numReviews || 0

    const reviewStats = {
      numReviews: reviews._count._all,
      numStars: reviews?._sum.numStars ?? 0,
      avgStars: avgStars
    }

    const seatsBooked = data?.bookings.reduce((sum, { numSeats = 0}) => sum + numSeats, 0)

    const response = {
      ...data,
      seatsBooked,
      user: {
        ...(data ? data.user : {}),
        ...reviewStats
      }
    }

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const { departureDate, addressDeparture, cityDeparture, addressDestination, cityDestination, routeDeviation,
    seatsTotal, pricePerSeat, bagSizeId, comment, allowChildren, allowSmoking, allowMusic, allowPets,
    hasComfort, useFerry, isElectric } = req.body;

  if (!departureDate || !addressDeparture || !cityDeparture || !addressDestination || !cityDestination ||
    !routeDeviation || !seatsTotal || !pricePerSeat || !bagSizeId || !comment
  ) {
    res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const trip = await prisma.trip.create({
      data: {
        userId: Number(userId),
        departureDate: new Date(departureDate),
        addressDeparture,
        cityDeparture,
        addressDestination,
        cityDestination,
        routeDeviation: Number(routeDeviation),
        seatsTotal: Number(seatsTotal),
        pricePerSeat,
        bagSizeId: Number(bagSizeId),
        comment,
        allowChildren: toBoolean(allowChildren) ?? false,
        allowSmoking: toBoolean(allowSmoking) ?? false,
        allowMusic: toBoolean(allowMusic) ?? false,
        allowPets: toBoolean(allowPets) ?? false,
        hasComfort: toBoolean(hasComfort) ?? false,
        useFerry: toBoolean(useFerry) ?? false,
        isElectric: toBoolean(isElectric) ?? false
      },
    });
    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { departureDate, addressDeparture, cityDeparture, addressDestination, cityDestination, routeDeviation,
    seatsTotal, pricePerSeat, bagSizeId, comment, allowChildren, allowSmoking, allowMusic, allowPets,
    hasComfort, useFerry, isElectric } = req.body;

  if (!departureDate || !addressDeparture || !cityDeparture || !addressDestination || !cityDestination ||
    !routeDeviation || !seatsTotal || !pricePerSeat || !bagSizeId || !comment
  ) {
    res.status(400).json({ error: 'All fields are required' });
  }

  const dataToUpdate: any = {
    departureDate: new Date(departureDate),
    addressDeparture,
    cityDeparture,
    addressDestination,
    cityDestination,
    routeDeviation: Number(routeDeviation),
    seatsTotal: Number(seatsTotal),
    pricePerSeat,
    bagSizeId: Number(bagSizeId),
    comment,
    allowChildren: toBoolean(allowChildren) ?? false,
    allowSmoking: toBoolean(allowSmoking) ?? false,
    allowMusic: toBoolean(allowMusic) ?? false,
    allowPets: toBoolean(allowPets) ?? false,
    hasComfort: toBoolean(hasComfort) ?? false,
    useFerry: toBoolean(useFerry) ?? false,
    isElectric: toBoolean(isElectric) ?? false
  };

  try {
    const data = await prisma.trip.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update trip' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.trip.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Trip deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete trip' });
  }
};