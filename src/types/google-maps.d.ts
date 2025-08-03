import { ComponentType } from 'react';
import { GoogleMapProps, MarkerProps, LoadScriptProps } from '@react-google-maps/api';

declare module '@react-google-maps/api' {
    export const GoogleMap: ComponentType<GoogleMapProps>;
    export const Marker: ComponentType<MarkerProps>;
    export const LoadScript: ComponentType<LoadScriptProps>;
} 