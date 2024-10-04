import { StudyOrigin } from '@/components/enums/data-types-enum';

const logoPalette = {
    custom_gray: '#D6DBDC',
    logo_turquoise: '#43BFB0',
    logo_green: '#95C973',
    hover_logo_green: '#99D960',
    logo_light_blue: '#9CDDD0',
    logo_dark_blue: '#233B70',
};

const chartPalette = [
    '#00BAB2', // Turquoise
    '#9CC385', // Green
    '#96D5D3', // Aqua
    '#c79098', // Pink
    '#189BD7', // Blue
    '#A678DE', // Lavender
    '#5E4B6B', // Dark Purple
    '#3B5360', // Dark Blue-Gray
    '#89BF9E', // Soft Green
    '#647D88', // Grayish Blue
    '#9C6B98', // Muted Purple
    '#FFA07A', // Light Salmon
    '#F4A499', // Sandy Brown
    '#FFD700', // Gold
    '#87CEEB', // Light Sky Blue
    '#4682B4', // Steel Blue
    '#B0C4DE', // Light Steel Blue
    '#8B4513', // Saddle Brown
    '#DDA0DD', // Plum
    '#FF69B4', // Hot Pink
];

const colors = {
    green1: '#9DC287',
    blue1: '#1B3D6E',
    white1: '#ffffff',
    cream1: '#fafafa',
    turquoise1: '#8dd0cf',
    lightsalmon: '#89BF9E', // Light Salmon
    navyblue: '#1A3F71', // Tomato
    black1: '#16151A', // Night Black
    black2: '#292a2f', // Raisin Black
};

const mapColors = {
    colorValue0: '#ffffff',
    colorValue1: '#c7eeff',
    colorValue5: '#afd8ed',
    colorValue15: '#98c2dc',
    colorValue30: '#83accb',
    colorValue50: '#6e96ba',
    colorValue100: '#5b81a9',
    colorValue250: '#496d98',
    colorValue500: '#395887',
    colorValue1000: '#294476',
    colorValue1500: '#1a3165',
    colorValue2000: '#0b1f54',
    colorValue3000: '#000c42',
};

const choroplethColors = [
    0,
    mapColors.colorValue0,
    5,
    mapColors.colorValue5,
    10,
    mapColors.colorValue15,
    15,
    mapColors.colorValue30,
    20,
    mapColors.colorValue50,
    25,
    mapColors.colorValue100,
    30,
    mapColors.colorValue250,
    40,
    mapColors.colorValue500,
    50,
    mapColors.colorValue1000,
    70,
    mapColors.colorValue1500,
    80,
    mapColors.colorValue3000,
];

const clusterColors = [
    mapColors.colorValue0,
    0,
    mapColors.colorValue1,
    2,
    mapColors.colorValue5,
    5,
    mapColors.colorValue15,
    15,
    mapColors.colorValue30,
    50,
    mapColors.colorValue50,
    100,
    mapColors.colorValue100,
    250,
    mapColors.colorValue250,
    500,
    mapColors.colorValue500,
    1000,
    mapColors.colorValue1000,
    1500,
    mapColors.colorValue1500,
    2000,
    mapColors.colorValue2000,
    3000,
    mapColors.colorValue3000,
];
type AdminPromptsTranslations = {
    [key in StudyOrigin]: string;
};

// Example usage
const tabColors: AdminPromptsTranslations = {
    [StudyOrigin.ALBUM_FAMILLE]: chartPalette[0],
    [StudyOrigin.INDEX_VOLETA]: chartPalette[1],
    [StudyOrigin.INDEX_VOLETB]: chartPalette[2],
};

export {
    logoPalette,
    chartPalette,
    colors,
    mapColors,
    choroplethColors,
    clusterColors,
    tabColors,
};
