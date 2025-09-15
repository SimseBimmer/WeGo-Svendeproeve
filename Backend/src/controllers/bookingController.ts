import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import { toBoolean } from '../utils/formatter.js';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.booking.findMany();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.booking.findUnique({
      where: { id: Number(id) }
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
};

export const getRecordsByUserId = async (req: Request, res: Response) => {
  const userId = req.user?.id
  try {
    const data = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      select: {
        tripId: true,
        comment: true
      }

    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const { tripId, comment, numSeats } = req.body;

  if (!tripId || !userId || !comment || !numSeats) {
    res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const trip = await prisma.booking.create({
      data: {
        userId: Number(userId),
        tripId: Number(tripId),
        comment,
        numSeats: Number(numSeats)
      },
    });
    res.status(201).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create trip' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.booking.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Booking deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};
