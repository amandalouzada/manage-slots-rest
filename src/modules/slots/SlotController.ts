import ISlotService from "./ISlotService";
import { Request, Response } from 'express';

export class SlotController {
  private slotService: ISlotService;
  constructor(slotService: ISlotService) {
    this.slotService = slotService;
  }

  create = async (req: Request, res: Response): Promise<any> => {
    // const { professionalId, intervalsByDayOfWeek } = req.body;
    // await this.slotService.createMany(professionalId, intervalsByDayOfWeek);
    // res.sendStatus(201);
  }

}