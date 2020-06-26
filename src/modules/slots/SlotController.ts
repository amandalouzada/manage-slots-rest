import ISlotService from "./ISlotService";
import { Request, Response } from 'express';
import { ISlotsRequestDto } from "./ISlotsDTO";
import IAvailabilityService from "./availability/IAvailabilityService";
import { ControllerResponse } from "@infra/http/Response";

export class SlotController {
  constructor(private slotService: ISlotService, private availabilityService: IAvailabilityService) {
    this.slotService = slotService;
    this.availabilityService = availabilityService;
  }

  createMany = async (req: Request, res: Response): Promise<any> => {
    const professionaId = res.locals.id;
    const slotRequest = { ...req.body } as ISlotsRequestDto;
    slotRequest.professionalId = professionaId
    const slots = await this.slotService.createMany(slotRequest);
    ControllerResponse.created(res,{slots});
  }


  list = async (req: Request, res: Response): Promise<any> => {
    let slots = [];
    const { start, end, professionalId } = req.query;
    if (!!start && !!end) {
      slots = await this.slotService.listSlotsByInterval(
        new Date(start.toString()),
        new Date(end.toString())
      );
    }
    ControllerResponse.ok(res, { slots });
  }

  booksASeesion = async (req: Request, res: Response): Promise<any> => {
    const customerId = res.locals.id;
    const { availabilityId } = req.body;
    const availability = await this.availabilityService.booksASession(
      availabilityId,
      customerId
    )
    ControllerResponse.ok(res, { availability });
  }

}