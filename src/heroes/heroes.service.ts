import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { Hero } from './entities/hero.entity';

@Injectable()
export class HeroesService {
  constructor(
    @InjectRepository(Hero)
    private readonly heroRepository: Repository<Hero>,
  ) {}
  create(createHeroDto: CreateHeroDto) {
    const hero = this.heroRepository.create(createHeroDto);
    return this.heroRepository.save(hero);
  }

  findAll() {
    return this.heroRepository.find();
  }

  async findOne(id: number) {
    const hero = await this.heroRepository.findOne(id);
    if (!hero) {
      throw new NotFoundException(`Hero #${id} not found`);
    }
    return this.heroRepository.save(hero);
  }

  async update(id: number, updateHeroDto: UpdateHeroDto) {
    console.log(updateHeroDto);
    console.log(typeof id);
    const hero = await this.heroRepository.preload({ id, ...updateHeroDto });
    console.log({ hero });
    if (!hero) {
      throw new NotFoundException(`Hero #${id} not found`);
    }
    return this.heroRepository.save(hero);
  }

  async remove(id: number) {
    const hero = await this.heroRepository.findOne(id);
    if (!hero) {
      throw new NotFoundException(`Hero #${id} not found`);
    }
    return this.heroRepository.remove(hero);
  }
}
