import { Card } from './Card'
import { FC, useEffect, useState } from 'react'
import { StudentIntro } from '../models/StudentIntro'
import * as web3 from "@solana/web3.js";

const STUDENT_INTRO_PROGRAM_ID = '3T7aE2YDSzUEMSQijcYqU7aVUCAtDRfCGo6B8yQj8b9E'

export const StudentIntroList: FC = () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([])

    useEffect(() => {
        connection.getProgramAccounts(new web3.PublicKey(STUDENT_INTRO_PROGRAM_ID))
            .then(async (accounts) => {
                const studentIntros: StudentIntro[] = accounts.reduce((accum: StudentIntro[], { pubkey, account }) => {
                    const movie = StudentIntro.deserialize(account.data)
                    if (!movie) {
                        return accum
                    }

                    return [...accum, movie]
                }, [])
                setStudentIntros(studentIntros)
            })
    }, [])
    
    return (
        <div>
            {
                studentIntros.map((studentIntro, i) => <Card key={i} studentIntro={studentIntro} /> )
            }
        </div>
    )
}