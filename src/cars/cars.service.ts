import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDTO, UpdateCarDTO } from './dto'

@Injectable()
export class CarsService {

    private cars : Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civi'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        }
    ]

    findAll() {
        return this.cars
    }

    findOneByID( id: string ) {
        
        const car = this.cars.find( c => c.id === id )

        if (!car) throw new NotFoundException(`Car with id: ${id} not found`)

        return car
    }

    createCar( createCarDTO: CreateCarDTO ) {
        
        const car = {
            id: uuid(),
            ...createCarDTO
        }

        this.cars.push(car)

        return car
    }

    updateCar( id: string, updateCarDTO: UpdateCarDTO ) {

        let carDB = this.findOneByID(id)

        this.cars = this.cars.map( car => {
            if ( car.id === id ) {
                carDB = { ...carDB, ...updateCarDTO, id }
                return carDB
            }

            return car
        })

        return carDB
    }

    deleteCar( id: string ){

        const carDB = this.findOneByID(id)
        this.cars = this.cars.filter( car => car.id !== carDB.id )

    }

}
