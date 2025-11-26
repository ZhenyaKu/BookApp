// Theme constants

import normalize from 'react-native-normalize';

const fonts = {
  georgia: 'Georgia',
  nunitoSans: 'NunitoSans',
  nunitoSansItalic: 'NunitoSans-Italic',
};

const colors = {
  // Background
  background: '#101010',
  placeholder: '#C4C4C4',

  // Text
  mainText: '#0B080F',
  textSecondary: '#393637',

  // Brand
  pink: '#D0006E',
  button: '#DD48A1',

  // Neutral
  white: '#FFFFFF',
  whiteOpacity70: '#FFFFFFB2',
  whiteOpacity20: '#FFFFFF33',
  dark: '#C1C2CA',
  divider: '#D9D5D6',

  // Progress
  progressBarTrack: '#FFFFFF33',
  progressBar: '#FFFFFF',
};

const typography = {
  // Titles
  title: {
    georgia52: {
      fontFamily: fonts.georgia,
      fontSize: normalize(52),
      fontWeight: '700' as const,
      lineHeight: normalize(52),
    },
    nunito24: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(24),
      fontWeight: '700' as const,
      lineHeight: normalize(26.4),
    },
    nunito20: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(20),
      fontWeight: '700' as const,
      lineHeight: normalize(22),
    },
    nunito18: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(18),
      fontWeight: '700' as const,
      lineHeight: normalize(22),
    },
  },

  // Body text
  body: {
    regular16: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(16),
      fontWeight: '400' as const,
      lineHeight: normalize(22),
    },
    semibold16: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(16),
      fontWeight: '600' as const,
      lineHeight: normalize(22),
    },
    regular14: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(14),
      fontWeight: '400' as const,
      lineHeight: normalize(20),
    },
    bold14: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(14),
      fontWeight: '700' as const,
    },
  },

  // Captions
  caption: {
    semibold12: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(12),
      fontWeight: '600' as const,
      lineHeight: normalize(13.2),
    },
  },

  // Buttons
  button: {
    primary: {
      fontFamily: fonts.nunitoSans,
      fontSize: normalize(16),
      fontWeight: '700' as const,
      lineHeight: normalize(22),
    },
  },
};

const spacing = {
  xs: normalize(4),
  sm: normalize(8),
  md: normalize(16),
  lg: normalize(24),
  xl: normalize(32),
};

const borderRadius = {
  sm: normalize(4),
  md: normalize(8),
  lg: normalize(12),
  xl: normalize(16),
  xxl: normalize(24),
};

export const theme = {
  colors,
  fonts,
  typography,
  spacing,
  borderRadius,
} as const;
