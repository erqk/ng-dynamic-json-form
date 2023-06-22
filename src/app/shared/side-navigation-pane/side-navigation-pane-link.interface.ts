export interface SideNaviagionPaneLink {
  id: string;
  label: string;
  tagName: string;
  children?: SideNaviagionPaneLink[];
}
