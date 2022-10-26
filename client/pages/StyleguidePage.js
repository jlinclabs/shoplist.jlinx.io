import * as React from 'react'
import { useTheme } from '@mui/material/styles';

import { useEffect, useState, useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import KeyboardCommandKeyTwoToneIcon from '@mui/icons-material/KeyboardCommandKeyTwoTone'
import CottageIcon from '@mui/icons-material/Cottage'

import InspectObject from 'app-shared/client/components/InspectObject'

export default function Styleguide(){
  const theme = useTheme()
  return <Container>
    <Typography variant="h4">Styleguide</Typography>
    {/*<InspectObject object={theme}/>*/}
    <ThemePalette {...{theme}}/>
    <TypographyExamples {...{theme}}/>
  </Container>
}

const PALETTES = 'primary secondary error warning info success'.split(' ')
function ThemePalette({ theme }){
  'primary secondary error warning info success'
  return <Box>
    <Typography variant="h5">Palettes</Typography>
    {PALETTES.map(palette =>
      <ColorGroup {...{key: palette, theme, palette}}/>
    )}
  </Box>
}

const PALETTES_VARIANTS = 'main light dark'.split(' ')
function ColorGroup({ theme, palette }) {
  const _palette = theme.palette[palette]

  return <Box sx={{
    display: 'flex',
    mb: 1,
    gap: '8px',
  }}>
    {PALETTES_VARIANTS.map(variant =>
      <ColorBox {...{
        key: variant,
        name: `${palette}.${variant}`,
        color: _palette[variant],
        contrastText: _palette.contrastText,
      }}/>
    )}
  </Box>
}


function ColorBox({ name, color, contrastText }){
  return <Box {...{
    sx: {
      border: '1px solid white',
      backgroundColor: color,
      color: contrastText,
      p: 1,
    }
  }}>{name}</Box>
}

const LONG_TEXT = (
  `Irure labore et commodo adipisicing. Aliqua excepteur ` +
  `aliqua velit tempor do ullamco id commodo exercitation ` +
  `ut ipsum id enim. Pariatur labore Lorem ea eu est fugiat ` +
  `laborum commodo sunt esse ex magna. Eu enim voluptate ` +
  `esse irure reprehenderit mollit tempor fugiat anim. Nulla ` +
  `proident cillum deserunt magna veniam veniam labore tempor ` +
  `irure. Sunt dolore tempor nulla do enim consectetur in ` +
  `ea sunt. Aliqua nostrud occaecat laboris ipsum ullamco ` +
  `velit dolore.`
)
function TypographyExamples({ theme }){
  const variants = Object.entries(theme.typography)
    .filter(([, value]) => typeof value === 'object')
    .map(([name]) => name)
  return <Box>
    <Typography variant="h5">Typography Examples</Typography>
    {variants.map((variant) =>
      <Box key={variant}>
        <Typography {...{variant}}>{variant}'s look like this</Typography>
      </Box>
    )}
  </Box>
}