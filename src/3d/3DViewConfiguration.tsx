// src/config/view3d-config.ts
import { StateColors, BuildingIdMap } from '@/3d/3DViewType';

export const STATE_COLORS: StateColors = {
    FREE: 0x00ff00,     // Green
    RESERVED: 0xffa500, // Orange
    SOLD: 0xff0000      // Red
};

export const BUILDING_ID_MAP: BuildingIdMap = {
    'Building1MultiObject': '1',
    'Building2MultiObject': '2',
    'Building3MultiObject': '3',
    'Building4MultiObject': '4',
    'Building5MultiObject': '5'
};

export const VIEW3D_DIMENSIONS = {
    WIDTH: 900,
    HEIGHT: 600
};