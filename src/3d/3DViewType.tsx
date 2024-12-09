// src/types/view3d-types.ts
export interface StateColors {
    FREE: number;
    RESERVED: number;
    SOLD: number;
    [key: string]: number;
}

export interface BuildingIdMap {
    [key: string]: string;
}

export interface PopupState {
    visible: boolean;
    content: string;
    position: {
        x: number;
        y: number;
    };
}