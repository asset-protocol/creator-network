import { defineConfig, presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  theme: {
    screens: {
      ssm: { max: '375px' },
      sm: { min: '376px', max: '768px' },
      md: { min: '769px', max: '1024px' },
      lg: { min: '1024px', max: '1280px' },
      xl: { min: '1281px', max: '1440px' },
      '2xl': { min: '1441px', max: '1680px' },
      '3xl': { min: '1681px', max: '1920px' },
      '4xl': { min: '1921px', max: '2560px' },
    },
    extend: {
      flex: {
        '2': '2',
      },
    },
    breakpoints: {
      sm: '375px',
      md: '769px',
      lg: '1025px',
      xl: '1281px',
      '2xl': '1441px',
      '3xl': '1681px',
      '4xl': '1921px',
    },
  },
  shortcuts: [
    ['frc-start', 'flex flex-row items-center justify-start'],
    ['frc-end', 'flex flex-row items-center justify-end'],
    ['frc-around', 'flex flex-row items-center justify-around'],
    ['frc-between', 'flex flex-row items-center justify-between'],
    ['frs-between', 'flex flex-row items-start justify-between'],
    ['fre-between', 'flex flex-row items-end justify-between'],
    ['frs-start', 'flex flex-row items-start justify-start'],
    ['frc-center', 'flex flex-row items-center justify-center'],
    ['fcc-start', 'flex flex-col items-center justify-start'],
    ['fcs-start', 'flex flex-col items-start justify-start'],
    ['fcs-between', 'flex flex-col items-start justify-between'],
    ['fcc-around', 'flex flex-col items-center justify-around'],
    ['fcc-between', 'flex flex-col items-center justify-between'],
    ['fcc-center', 'flex flex-col items-center justify-center'],
    ['fcs-center', 'flex flex-col items-start justify-center'],
    ['fce-center', 'flex flex-col items-end justify-center'],
    ['fce-end', 'flex flex-col items-end justify-end'],
    ['frs-center', 'flex flex-row items-start justify-center'],
    ['flex-layout', 'w-full mx-auto px-8 md:px-4 max-w-1280px'],
  ],
  presets: [presetUno(), presetAttributify(), presetIcons()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
