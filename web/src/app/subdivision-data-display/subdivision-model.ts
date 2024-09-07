export interface ISubdivision {
    subdivisions: Subdivision[];
}

export interface Subdivision {
    id: number;
    code?: null | string;
    name?: string;
    longitude?: number;
    latitude?: number;
    fieldSurveyTerritoryId?: number;
    marketId?: number;
    subdivisionStatusId?: number;
    surveyMethodId?: number;
    activeSections?: number;
    futureSections?: number;
    builtOutSections?: number;
    totalLots?: number;
    fieldSurveyTerritoryName?: string;
    marketName?: MarketName;
    marketAbbreviation?: MarketAbbreviation;
    subdivisionStatusCode?: SubdivisionStatusCode;
    surveyMethodCode?: SurveyMethodCode;
    county?: County | null;
    community?: Community | null;
    zoom17Date?: Date | null;
    zoom18Date?: Date | null;
    subdivisionGeometryId?: null;
    subdivisionGeometryBoundingBoxId?: null;
    subdivisionGeometryBoundaryId?: null;
    subdivisionGeometryIntelligenceBoundaryId?: number;
    subdivisionGeometryIntelligenceBoundaryStatusId?: number;
    subdivisionGeometryIntelligenceBoundaryStatusCode?: SubdivisionGeometryIntelligenceBoundaryStatusCode;
    subdivisionGeometryIntelligenceBoundaryStatusChangeDate?: Date;
    nearMapImageDate?: Date | null;
    imageBoxId?: number;
    mostRecentIPointBatchDate?: Date | null;
    iPoints?: null;
    validatediPoints?: null;
    subdivisionSpecificStatus?: null | string;
}

export enum Community {
    Anthem = "Anthem",
    BlackMountain = "Black Mountain",
    Cadence = "Cadence",
    CoronadoRanch = "Coronado Ranch",
    HendersonWest = "Henderson West",
    Inspirada = "Inspirada",
    LakeLasVegas = "Lake Las Vegas",
    MACDonaldHighlands = "MacDonald Highlands",
    MountainSEdge = "Mountain's Edge",
    SedonaRanch = "Sedona Ranch",
    SevenHills = "Seven Hills",
    SkyeCanyon = "Skye Canyon",
    SkyeHills = "Skye Hills",
    SouthernHighlands = "Southern Highlands",
    Summerlin = "Summerlin",
    Sunstone = "Sunstone",
    SymphonyPark = "Symphony Park",
    Tuscany = "Tuscany",
    ValleyVista = "Valley Vista",
    VillagesAtTuleSprings = "Villages at Tule Springs",
}

export enum County {
    Clark = "Clark",
}

export enum MarketAbbreviation {
    LV = "LV",
}

export enum MarketName {
    LasVegas = "Las Vegas",
}

export enum SubdivisionGeometryIntelligenceBoundaryStatusCode {
    Default = "Default",
    Finalized = "Finalized",
}

export enum SubdivisionStatusCode {
    Active = "Active",
    Builtout = "Builtout",
    Future = "Future",
    Na = "NA",
}

export enum SurveyMethodCode {
    BackOffice = "BACK_OFFICE",
    Builtout = "BUILTOUT",
    Drive = "DRIVE",
    Na = "NA",
    Nearmap = "NEARMAP",
}
