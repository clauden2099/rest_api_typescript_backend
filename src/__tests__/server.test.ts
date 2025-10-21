import db from '../config/db'
import { connectDB } from '../server'

jest.mock('../config/db')

describe('connectDB', () => {
    it('should handle database connnection error', async () => {
        jest.spyOn(db,'authenticate')
            .mockRejectedValue(new Error('Error en la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error en la BD')
        )
    })
})