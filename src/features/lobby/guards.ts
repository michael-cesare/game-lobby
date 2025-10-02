import { isEmpty } from "@/utils/primitive";
import { IItems } from "./typings";

/** validates if item is of type IItem from lobby config */
export const isLobbyItem = ( item: any ): item is IItems =>
  'id' in item && !isEmpty( item.id );
