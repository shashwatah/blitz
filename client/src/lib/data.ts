export interface ChessPiece {
    initRow: number,
    initCol: number[],
    svg: string
}

interface ChessPieces {
    [name: string]: ChessPiece
}

let chessPieces: ChessPieces = {
    "king": {
        initRow: 1,
        initCol: [5],
        svg: `<g><path d="M21,24H11c-2.7568,0-5,2.2432-5,5c0,0.5522,0.4478,1,1,1h18c0.0063-0.0005,0.0132,0,0.02,0c0.5522,0,1-0.4478,1-1   c0-0.0767-0.0088-0.1509-0.0249-0.2227C25.8779,26.1235,23.6821,24,21,24z"/><path d="M11.4155,9.811c0.2607,0.1875,0.5952,0.2383,0.9009,0.1377l1.1025-0.3677l-0.3677,1.1025   c-0.1016,0.3052-0.0503,0.6401,0.1377,0.9009C13.377,11.8457,13.6787,12,14,12h4c0.3213,0,0.623-0.1543,0.811-0.4155   c0.188-0.2607,0.2393-0.5957,0.1377-0.9009l-0.3677-1.1025l1.1025,0.3677c0.3037,0.1006,0.6396,0.0498,0.9009-0.1377   C20.8457,9.623,21,9.3213,21,9V5c0-0.3213-0.1543-0.623-0.4155-0.811C20.3232,4,19.9873,3.9492,19.6836,4.0513l-1.1025,0.3677   l0.3677-1.1025c0.1016-0.3052,0.0503-0.6401-0.1377-0.9009C18.623,2.1543,18.3213,2,18,2h-4c-0.3213,0-0.623,0.1543-0.811,0.4155   c-0.188,0.2607-0.2393,0.5957-0.1377,0.9009l0.3677,1.1025l-1.1025-0.3677C12.0107,3.9492,11.6763,4,11.4155,4.189   C11.1543,4.377,11,4.6787,11,5v4C11,9.3213,11.1543,9.623,11.4155,9.811z"/><path d="M22,23c0.5522,0,1-0.4478,1-1s-0.4478-1-1-1H10c-0.5522,0-1,0.4478-1,1s0.4478,1,1,1H22z"/><path d="M26.5562,13.1519c-2.1157-1.415-4.9775-1.5142-7.1841-0.248L16,14.8369l-3.3721-1.9331   c-2.207-1.2661-5.0693-1.167-7.1841,0.248c-0.4424,0.2959-0.5757,0.8872-0.3022,1.3442l3,5.0171C8.3223,19.8149,8.6484,20,9,20h14   c0.3516,0,0.6777-0.1851,0.8584-0.4868l3-5.0171C27.1318,14.0391,26.9985,13.4478,26.5562,13.1519z"/></g>`
    },
    "queen": {
        initRow: 1,
        initCol: [4],
        svg: `<g><path d="M25.9951,28.7773C25.8779,26.1235,23.6821,24,21,24H11c-2.7568,0-5,2.2432-5,5c0,0.5522,0.4478,1,1,1h18   c0.0073-0.0005,0.0132,0,0.02,0c0.5522,0,1-0.4478,1-1C26.02,28.9233,26.0112,28.8491,25.9951,28.7773z"/><path d="M26.6553,9.2446c-0.3062-0.2651-0.7407-0.3203-1.1025-0.1392l-5.2104,2.6055L16.832,6.4453   c-0.3711-0.5566-1.293-0.5566-1.6641,0l-3.5103,5.2656L6.4473,9.1055C6.085,8.9243,5.6509,8.9795,5.3447,9.2446   c-0.3057,0.2651-0.4214,0.688-0.2935,1.0718l3,9C8.1875,19.7246,8.5693,20,9,20h14c0.4307,0,0.8125-0.2754,0.9487-0.6836l3-9   C27.0767,9.9326,26.9609,9.5098,26.6553,9.2446z"/><circle cx="4" cy="8" r="2"/><circle cx="16" cy="4" r="2"/><circle cx="28" cy="8" r="2"/><path d="M22,23H10c-0.5522,0-1-0.4478-1-1s0.4478-1,1-1h12c0.5522,0,1,0.4478,1,1S22.5522,23,22,23z"/></g>`
    },
    "rook": {
        initRow: 1,
        initCol: [1, 8],
        svg: `<g><path d="M24.7471,2.3447C24.5569,2.126,24.2817,2,23.992,2h-2.997c-0.5522,0-0.999,0.4478-0.999,1v2h-0.999V3   c0-0.5522-0.4468-1-0.999-1h-3.996c-0.5517,0-0.999,0.4478-0.999,1v2h-0.999V3c0-0.5522-0.4473-1-0.999-1H8.008   C7.7183,2,7.4431,2.126,7.2534,2.3447C7.0636,2.564,6.9783,2.8545,7.0192,3.1416l0.999,7C8.0885,10.6343,8.5099,11,9.007,11h13.986   c0.4975,0,0.919-0.3657,0.9892-0.8584l0.999-7C25.0222,2.8545,24.9364,2.564,24.7471,2.3447z"/><path d="M21.994,14H10.006c-0.5517,0-0.999-0.4478-0.999-1s0.4473-1,0.999-1h11.988c0.5522,0,0.999,0.4478,0.999,1   S22.5462,14,21.994,14z"/><path d="M25.9751,28.7773C25.8581,26.1235,23.6644,24,20.985,24h-9.99C8.2409,24,6,26.2432,6,29c0,0.5522,0.4473,1,0.999,1h17.982   c0.0063-0.001,0.0132-0.0005,0.02,0C25.5527,30,26,29.5522,26,29C26,28.9233,25.9912,28.8491,25.9751,28.7773z"/><path d="M10.995,23h9.99c0.0744,0,0.1468,0.008,0.2205,0.0107c-0.7966-2.0623-1.2195-4.2722-1.2195-6.4828V16   c0-0.5522-0.4473-1-0.999-1h-5.994c-0.5517,0-0.999,0.4478-0.999,1v0.5278c0,2.2108-0.423,4.4209-1.2197,6.4833   C10.8482,23.0085,10.9205,23,10.995,23z"/></g>`
    },
    "knight": {
        initRow: 1,
        initCol: [2, 7],
        svg: `<g><path d="M26.9767,28.7772c-0.112-2.6538-2.2101-4.7773-4.7739-4.7773h-9.5571c-2.6347,0-4.7785,2.2432-4.7785,5   c0,0.5522,0.4275,1,0.9557,1h17.2028c0.0065,0.0005,0.014,0,0.0187,0c0.5283,0,0.9557-0.4478,0.9557-1   C27,28.9232,26.9925,28.849,26.9767,28.7772z"/><path d="M23.1585,22.9999H11.69c-0.5283,0-0.9557-0.4478-0.9557-1s0.4275-1,0.9557-1h11.4685c0.5283,0,0.9557,0.4478,0.9557,1   S23.6868,22.9999,23.1585,22.9999z"/><path d="M25.8393,10.7084c-1.1041-5.1274-5.3824-8.7085-10.4055-8.7085h-0.1941c-2.0831,0-4.6124,1.5269-5.0576,3.7993   c-0.0579,0.2944,0.014,0.6001,0.196,0.833c0.0233,0.0308,0.0495,0.0596,0.0765,0.0869L5.6172,11.285   c-0.0635,0.0605-0.1195,0.1299-0.1661,0.2056c-0.5432,0.894-0.6001,2.0381-0.1475,2.9878   c0.4835,1.0088,1.6109,1.4731,2.6198,1.0859l4.1044-1.918c0,0,1.2254,0.8535,1.9693,0.8535h1.12   c1.5353,0,2.785-1.3071,2.785-2.9141V9.9999c0-0.2764,0.2137-0.5,0.4779-0.5c0.2641,0,0.4779,0.2236,0.4779,0.5v1.5859   c0,2.1582-1.6781,3.9141-3.7407,3.9141h-1.12c-0.3049,0-0.6004-0.0503-0.8893-0.1241c-0.5838,1.0887-0.9388,2.3545-0.9388,3.6241   c0,0.5522,0.4275,1,0.9557,1h10.0667c0.3621,0,0.6925-0.2139,0.8549-0.5522l0.1288-0.2695   C25.2914,16.8427,26.4888,13.7699,25.8393,10.7084z M14.4171,6.8534l-0.9557,1c-0.0933,0.0977-0.2156,0.1465-0.3379,0.1465   c-0.1223,0-0.2445-0.0488-0.3379-0.1465c-0.1867-0.1953-0.1867-0.5117,0-0.707l0.9557-1c0.1867-0.1953,0.4891-0.1953,0.6757,0   C14.6038,6.3417,14.6038,6.6581,14.4171,6.8534z"/></g>`
    },
    "bishop": {
        initRow: 1,
        initCol: [3, 6],
        svg: `<g><path d="M25.9756,28.7772c-0.1171-2.6538-2.3102-4.7773-4.9902-4.7773h-9.9902c-2.7541,0-4.9951,2.2432-4.9951,5   c0,0.5522,0.4468,1,0.999,1h17.9824c0.0078,0.0005,0.0146,0,0.0195,0c0.5522,0,0.999-0.4478,0.999-1   C26,28.9232,25.9922,28.849,25.9756,28.7772z"/><path d="M20.6124,7.2425l-3.8095,5.3384c-0.1951,0.2734-0.5015,0.4189-0.8137,0.4189c-0.201,0-0.4039-0.0605-0.5795-0.186   c-0.4488-0.3213-0.5532-0.9458-0.2322-1.395l4.2574-5.9662c-1.3768-1.894-2.6552-3.085-2.7705-3.1906   c-0.3824-0.3496-0.9659-0.3496-1.3483,0c-0.2576,0.2358-6.319,5.8623-6.319,12.7378c0,1.7222,0.6361,3.3799,1.7912,4.668   c0.1893,0.2114,0.4595,0.332,0.7434,0.332h8.9171c0.2839,0,0.5541-0.1206,0.7434-0.332c1.1551-1.2881,1.7912-2.9458,1.7912-4.668   C22.9834,12.0816,21.8891,9.3941,20.6124,7.2425z"/><path d="M21.9844,22.9999H9.9961c-0.5522,0-0.999-0.4478-0.999-1s0.4468-1,0.999-1h11.9883c0.5522,0,0.999,0.4478,0.999,1   S22.5366,22.9999,21.9844,22.9999z"/></g>`
    },
    "pawn": {
        initRow: 2,
        initCol: [1, 2, 3, 4, 5, 6, 7, 8],
        svg: `<g><path d="M15.99,2c-2.479,0-4.4955,2.0186-4.4955,4.5S13.511,11,15.99,11s4.4955-2.0186,4.4955-4.5S18.469,2,15.99,2z"/><path d="M25.9751,28.7773C25.8581,26.1235,23.6644,24,20.985,24h-9.99C8.2409,24,6,26.2432,6,29c0,0.5522,0.4473,1,0.999,1h17.982   c0.0063-0.001,0.0132-0.0005,0.02,0C25.5527,30,26,29.5522,26,29C26,28.9233,25.9912,28.8491,25.9751,28.7773z"/><path d="M21.984,14H9.996c-0.5517,0-0.999-0.4478-0.999-1s0.4473-1,0.999-1h11.988c0.5517,0,0.999,0.4478,0.999,1   S22.5357,14,21.984,14z"/><path d="M10.995,23h9.99c0.0744,0,0.1468,0.008,0.2205,0.0107c-0.7966-2.0623-1.2195-4.2722-1.2195-6.4828V16   c0-0.5522-0.4473-1-0.999-1h-5.994c-0.5517,0-0.999,0.4478-0.999,1v0.5278c0,2.2108-0.423,4.4209-1.2197,6.4833   C10.8482,23.0085,10.9205,23,10.995,23z"/></g>`
    }
}

export {
    chessPieces
}