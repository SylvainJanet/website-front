import { EntityDto } from './entityDto';
import { WebsiteMainMenuItemDto } from './websiteMainMenuItemDto';

export interface WebsiteMainMenuDto extends EntityDto {
  items: WebsiteMainMenuItemDto[];
}
