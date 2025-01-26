import { Router, Request, Response } from 'express';
import { db } from '../db';
import { NewUser, users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcryptjs from 'bcryptjs';

const authRouter = Router();

authRouter.get('/', (req, res) => {
    res.send('This is Dwaipayan');
});

interface SignUpBody{
    name: string;
    email: string;
    password: string;
}

authRouter.post('/signup', async (req: Request<{}, {}>, res : Response) => {
    try {
        const {name, email, password} = req.body;

       const existingUser = await db.select().from(users).where(eq(users.email, email));

       if (existingUser.length) {
         res.status(400).json({msg: "User already exists"});
         return;
       }

       const hashedPassword = await bcryptjs.hash(password, 10);

       const newUser: NewUser = {
        name,
        email,
        password: hashedPassword
       }

      const [user] = await db.insert(users).values(newUser).returning()


      res.status(201).json(user);

    } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
    }
});

export default authRouter;