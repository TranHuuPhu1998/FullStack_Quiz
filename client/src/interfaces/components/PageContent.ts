export interface PageContentBaseProps {
  title?: string;
  subtitle?: string;
  useBack?: boolean;
  backTo?: string;
  actions?: React.ReactNode[];
  aside?: React.ReactNode;
}
