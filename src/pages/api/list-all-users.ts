
import { CreateQuery } from '@/core/database/db_connection'
import User, { UserType } from '@/core/mysql/DbHelper';
import type { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers';

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {


    var result = await CreateQuery("SELECT * FROM users;");

    console.log(result as Object[]);

    var newList = result as Object[];

    for (let i = 0; i < newList.length; i++) {
        const currElement = newList[i];

        const createUser: UserType = currElement as UserType;

        var newUser: User = new User(createUser);

        console.log(`Nome do usuario atual ${newUser.id}`);

    }



    res.status(200).json(result)
}
