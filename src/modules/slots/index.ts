import { SlotRespository } from "./SlotRepository";
import SlotModel from "@infra/mongoose/models/Slot";
import { SlotService } from "./SlotService";
import { SlotController } from "./SlotController";

const slotRepository = new SlotRespository(SlotModel);
const slotService = new SlotService(slotRepository);
const slotController = new SlotController(slotService);

export {
  slotRepository,
  slotService,
  slotController
}