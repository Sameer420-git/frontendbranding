
export interface BrandingTheme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    text: string;
  };
  typography: {
    primaryFont: string;
    secondaryFont: string;
  };
}

export interface GlobalTypography {
  fontWeight: string;
  fontSize: string;
}

export interface BrandingData {
  projectName: string;
  projectDescription: string;
  brandName: string;
  lightTheme: BrandingTheme;
  darkTheme: BrandingTheme;
  globalTypography: GlobalTypography;
}
   