import { SlotRespository } from "./SlotRepository";
import SlotModel from "@infra/mongoose/models/Slot";
import { SlotService } from "./SlotService";
import { SlotController } from "./SlotController";
import AvailabilityService from "./availability/AvailabilityService";

const slotRepository = new SlotRespository(SlotModel);
const slotService = new SlotService(slotRepository);
const availabilityService = new AvailabilityService(slotRepository);
const slotController = new SlotController(slotService, availabilityService);

export {
  slotRepository,
  slotService,
  slotController
}