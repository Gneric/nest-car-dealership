import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
// import { Car } from './interfaces/car.interface';
import { CreateCarDTO, UpdateCarDTO } from './dto';

// const uuidCustomPipe = () : ParseUUIDPipe => {
//   return new ParseUUIDPipe({
//     version: '4'
//   })
// }

@Controller('cars')
export class CarsController {

  constructor(
    private readonly carsService : CarsService
  ){}

  @Get()
  getAllCars() {
    return this.carsService.findAll()
  }

  @Get(':id')
  getCarByID(
    @Param('id', ParseUUIDPipe) id : string
  ) {
    return this.carsService.findOneByID(id)
  }

  @Post()
  createCar( 
    @Body() createCarDTO: CreateCarDTO
  ){
    return this.carsService.createCar(createCarDTO)
  }

  @Patch(':id')
  updateCar( 
    @Param('id', ParseUUIDPipe) id : string,
    @Body() updateCarDTO: UpdateCarDTO
  ){
    return this.carsService.updateCar(id, updateCarDTO)
  }

  @Delete(':id')
  deleteCar( 
    @Param('id', ParseUUIDPipe) id : string 
  ){
    return this.carsService.deleteCar(id)
  }

}
