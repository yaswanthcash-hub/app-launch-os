/**
 * App Launch OS - NativeWind v4 Preset
 * Provides DTCG token scales, 8pt spacing grid, and concentric corner radius scales.
 */

module.exports = {
  theme: {
    extend: {
      spacing: {
        '1': '2px',
        '2': '4px',
        '3': '8px',
        '4': '12px',
        '5': '16px',
        '6': '24px',
        '7': '32px',
        '8': '48px',
        '9': '64px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '18px',
        '2xl': '24px',
        '3xl': '32px',
        'hardware': '50px', // Screen bezel radius
        'full': '9999px',
      },
      colors: {
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        surface: {
          light: '#FFFFFF',
          'light-subtle': '#F8FAFC',
          dark: '#0F172A',
          'dark-subtle': '#1E293B',
          'dark-elevated': '#020617',
        }
      }
    }
  }
};
