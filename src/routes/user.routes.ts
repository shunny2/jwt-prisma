import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma';

import { validateUser } from '../helpers';

const userRoutes = Router();

userRoutes.get('/', async (_, res: Response) => {
    const count = await prisma.user.count()

    return res.json({ count });
});

userRoutes.post('/', async (req: Request, res: Response) => {
    const { error, value } = validateUser(req.body);

    if (error)
        return res.status(400).json({ message: error?.message });

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: value.email
            }
        });
        
        if (user)
            return res.status(400).json({ message: 'This user already exists!' });

        await prisma.user.create({
            data: { name: value.name, email: value.email }
        });

        return res.status(201).json();
    } catch (error) {
        return res.status(500).json({ error: 'Unable to register. There was an internal server error.' });
    }
});

export default userRoutes;