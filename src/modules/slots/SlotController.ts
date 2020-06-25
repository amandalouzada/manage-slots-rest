import ISlotService from "./ISlotService";
import { Request, Response } from 'express';
import { ISlotsRequestDto } from "./ISlotsDTO";
import IAvailabilityService from "./availability/IAvailabilityService";

export class SlotController {
  constructor(private slotService: ISlotService, private availabilityService: IAvailabilityService) {
    this.slotService = slotService;
    this.availabilityService = availabilityService;
  }

  createMany = async (req: Request, res: Response): Promise<any> => {
    // const professionaId = res.locals.id;
    // const slotRequest = { ...req.body, professionaId } as ISlotsRequestDto;
    const slotRequest = req.body as ISlotsRequestDto;
    const slots = await this.slotService.createMany(slotRequest);
    res.json({ slots });

  }


  list = async (req: Request, res: Response): Promise<any> => {
    // const professionaId = res.locals.id;
    // const slotRequest = { ...req.body, professionaId } as ISlotsRequestDto;

    const { start, end, professionalId } = req.query;
    const slots = await this.slotService.listSlotsByInterval(
      new Date(start.toString()),
      new Date(end.toString())
    );

    res.json({ slots });
  }

  booksASeesion = async (req: Request, res: Response): Promise<any> => {
    const { availabilityId, customerId } = req.body;
    const availability = await this.availabilityService.booksASession(
      availabilityId,
      customerId
    )
    res.json({ availability })
  }

}