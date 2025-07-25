import React from 'react';
import { Context } from 'react';
export declare function createContextHoc<CP, CV extends {}, R = never>(useContextValue: (p: CP, r: R) => CV, context?: Context<CV>): readonly [(Component: React.FunctionComponent<CV>) => (p: CP, r: R) => React.JSX.Element, () => CV];
