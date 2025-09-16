import { Request, RequestHandler, Response } from 'express';
import { prisma } from '../prisma.js';
import bcrypt from 'bcrypt';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true
      }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        description: true,
        imageUrl: true, // bruger imageUrl fordi det er feltet i Prisma modellen
        isActive: true
      }
    });
    if (!user) res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const createRecord = async (req: Request, res: Response) => {
  // Skiftet fra 'image' til 'imageUrl' fordi Prisma og frontend bruger imageUrl
  const { firstname, lastname, email, password, description, imageUrl, refreshToken, isActive } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        description,
        imageUrl, // Her bruger vi imageUrl for at undgå fejl
        refreshToken,
        isActive: Boolean(isActive),
      },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const updateRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Skiftet fra 'image' til 'imageUrl' fordi Prisma og frontend bruger imageUrl
  const { firstname, lastname, email, password, description, imageUrl, refreshToken, isActive } = req.body;

  try {
    const dataToUpdate: any = {
      firstname,
      lastname,
      email,
      description,
      imageUrl, 
      refreshToken,
      isActive: Boolean(isActive),
    };

    // Hash password only if provided
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};