import { headerNavigation, footerNavigation } from "@/shared/config/navigation-constants";
import { NavigationItem, SocialLink } from "@/shared/model/navigation-types";

export class NavigationService {
  private static instance: NavigationService;

  private constructor() {}

  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }

  public getHeaderItems(): NavigationItem[] {
    return headerNavigation;
  }

  public getFooterSocialLinks(): SocialLink[] {
    return footerNavigation.social;
  }

  public getFooterLinks(): NavigationItem[] {
    return footerNavigation.links;
  }
}

export const navigationService = NavigationService.getInstance();

