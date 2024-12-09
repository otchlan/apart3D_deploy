// src/utils/view3d-utils.ts
import * as THREE from 'three';
import { BUILDING_ID_MAP, STATE_COLORS } from '@/3d/3DViewConfiguration';
import { Apartment } from '@/types/apartment-type';

export const getApartmentState = (
    buildingName: string, 
    apartments?: Apartment[], 
    apartmentsLoading?: boolean, 
    error?: any
): string => {
    if (!apartments || apartmentsLoading || error) {
        console.log('Apartments not loaded or error:', { apartmentsLoading, error });
        return 'free';
    }
    
    const buildingId = BUILDING_ID_MAP[buildingName];
    const apartment = apartments.find(apt => apt.ID === buildingId);
    
    if (!apartment) {
        console.log('No apartment found for building:', buildingName);
        return 'free';
    }

    const state = apartment.ApartmentState?.toUpperCase() || 'free';
    return state;
};

export const getHoverColor = (
    buildingName: string, 
    apartments?: Apartment[], 
    apartmentsLoading?: boolean, 
    error?: any
): number => {
    const state = getApartmentState(buildingName, apartments, apartmentsLoading, error);
    return STATE_COLORS[state as keyof typeof STATE_COLORS] || STATE_COLORS.free;
};

export const isMaterialWithColor = (material: THREE.Material): material is THREE.Material & { color: THREE.Color } => {
    return 'color' in material && material.color instanceof THREE.Color;
};

export const setHoveredPart = (
    part: THREE.Mesh, 
    hoverColor: number
) => {
    const materials = Array.isArray(part.material) ? part.material : [part.material];

    materials.forEach((material, index) => {
        const clonedMaterial = material.clone();
        
        if (part.userData.originalMaterials === undefined) {
            part.userData.originalMaterials = materials;
        }

        if (isMaterialWithColor(clonedMaterial)) {
            if (part.userData.originalColor === undefined) {
                part.userData.originalColor = clonedMaterial.color.getHex();
            }
            clonedMaterial.color.setHex(hoverColor);
        }

        if (part.userData.originalOpacity === undefined) {
            part.userData.originalOpacity = clonedMaterial.opacity;
        }

        if (Array.isArray(part.material)) {
            part.material[index] = clonedMaterial;
        } else {
            part.material = clonedMaterial;
        }
    });
};

export const resetHoveredPart = (part: THREE.Mesh) => {
    const materials = Array.isArray(part.material) ? part.material : [part.material];

    materials.forEach((material) => {
        if (isMaterialWithColor(material) && part.userData.originalColor !== undefined) {
            material.color.set(part.userData.originalColor);
        }
        if (part.userData.originalOpacity !== undefined) {
            material.opacity = part.userData.originalOpacity;
            material.transparent = part.userData.originalOpacity < 1;
        }
    });
};