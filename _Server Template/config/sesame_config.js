module.exports = {
    backgrounds: [
        { id: 1, name: "Background 1", from: 8, to: 10, bonus: 2 },
        { id: 2, name: "Background 2", from: 10, to: 12, bonus: 2 },
        { id: 3, name: "Background 3", from: 12, to: 14, bonus: 2 },
        { id: 4, name: "Background 4", from: 14, to: 16, bonus: 2 },
        { id: 5, name: "Background 5", from: 16, to: 18, bonus: 2 },
        { id: 6, name: "Background 6", from: 18, to: 20, bonus: 3 },
        { id: 7, name: "Background 7", from: 20, to: 22, bonus: 3 }
    ],
    foods: [
        { id: 1, type: food, name: "Food 1", levelPoint: 10, energy: 400, price: 100 },
        { id: 2, type: food, name: "Food 2", levelPoint: 10, energy: 1, price: 0 },
        { id: 3, type: food, name: "Food 3", levelPoint: 15, energy: 1, price: 0 },
        { id: 4, type: food, name: "Food 4", levelPoint: 15, energy: 1, price: 0 },
        { id: 5, type: food, name: "Food 5", levelPoint: 20, energy: 1, price: 0 },
        { id: 6, type: food, name: "Food 6", levelPoint: 20, energy: 2, price: 0 },
        { id: 7, type: food, name: "Food 7", levelPoint: 25, energy: 3, price: 0 },
        { id: 8, type: food, name: "Food 8", levelPoint: 30, energy: 4, price: 0 },
        { id: 9, type: food, name: "Food 9", levelPoint: 40, energy: 5, price: 0 },
        { id: 10, type: food, name: "Food 10", levelPoint: 50, energy: 6, price: 0 }
    ],
    books: [
        { id: 1, type: book, name: "Book 1", levelPoint: 10, price: 0 },
        { id: 2, type: book, name: "Book 2", levelPoint: 100, price: 0 },
        { id: 3, type: book, name: "Book 3", levelPoint: 200, price: 0 },
        { id: 4, type: book, name: "Book 4", levelPoint: 300, price: 0 }
    ],

    unlockItems:[
        {
            id: 1,
            data:  [  
                {level: 1,  food: [1], book: [1]},
                {level: 5,  food: [1,2], book: [1]},
                {level: 11, food: [1,2,3], book: [1,2]},
                {level: 13, food: [1,2,3,4], book: [1,2]},
                {level: 15, food: [1,2,3,4,5], book: [1,2]},
                {level: 17, food: [1,2,3,4,5,6], book: [1,2]},
                {level: 19, food: [1,2,3,4,5,6,7], book: [1,2,3]},
                {level: 21, food: [1,2,3,4,5,6,7,8], book: [1,2,3]},
                {level: 25, food: [1,2,3,4,5,6,7,8,9], book: [1,2,3,4]},
                {level: 27, food: [1,2,3,4,5,6,7,8,9,10], book: [1,2,3,4]}
            ]
        },
        {
            id: 2,
            data:  [  
                {level: 1,  food: [1], book: [1]},
                {level: 5,  food: [1,2], book: [1]},
                {level: 11, food: [1,2,3], book: [1,2]},
                {level: 13, food: [1,2,3,4], book: [1,2]},
                {level: 15, food: [1,2,3,4,5], book: [1,2]},
                {level: 17, food: [1,2,3,4,5,6], book: [1,2]},
                {level: 19, food: [1,2,3,4,5,6,7], book: [1,2,3]},
                {level: 21, food: [1,2,3,4,5,6,7,8], book: [1,2,3]},
                {level: 25, food: [1,2,3,4,5,6,7,8,9], book: [1,2,3,4]},
                {level: 27, food: [1,2,3,4,5,6,7,8,9,10], book: [1,2,3,4]}
            ]
        },
        {
            id: 3,
            data:  [  
                {level: 1,  food: [1], book: [1]},
                {level: 5,  food: [1,2], book: [1]},
                {level: 11, food: [1,2,3], book: [1,2]},
                {level: 13, food: [1,2,3,4], book: [1,2]},
                {level: 15, food: [1,2,3,4,5], book: [1,2]},
                {level: 17, food: [1,2,3,4,5,6], book: [1,2]},
                {level: 19, food: [1,2,3,4,5,6,7], book: [1,2,3]},
                {level: 21, food: [1,2,3,4,5,6,7,8], book: [1,2,3]},
                {level: 25, food: [1,2,3,4,5,6,7,8,9], book: [1,2,3,4]},
                {level: 27, food: [1,2,3,4,5,6,7,8,9,10], book: [1,2,3,4]}
            ]
        },
        {
            id: 4,
            data:  [  
                {level: 1,  food: [1], book: [1]},
                {level: 5,  food: [1,2], book: [1]},
                {level: 11, food: [1,2,3], book: [1,2]},
                {level: 13, food: [1,2,3,4], book: [1,2]},
                {level: 15, food: [1,2,3,4,5], book: [1,2]},
                {level: 17, food: [1,2,3,4,5,6], book: [1,2]},
                {level: 19, food: [1,2,3,4,5,6,7], book: [1,2,3]},
                {level: 21, food: [1,2,3,4,5,6,7,8], book: [1,2,3]},
                {level: 25, food: [1,2,3,4,5,6,7,8,9], book: [1,2,3,4]},
                {level: 27, food: [1,2,3,4,5,6,7,8,9,10], book: [1,2,3,4]}
            ]
        },
        {
            id: 5,
            data:  [  
                {level: 1,  food: [1], book: [1]},
                {level: 5,  food: [1,2], book: [1]},
                {level: 11, food: [1,2,3], book: [1,2]},
                {level: 13, food: [1,2,3,4], book: [1,2]},
                {level: 15, food: [1,2,3,4,5], book: [1,2]},
                {level: 17, food: [1,2,3,4,5,6], book: [1,2]},
                {level: 19, food: [1,2,3,4,5,6,7], book: [1,2,3]},
                {level: 21, food: [1,2,3,4,5,6,7,8], book: [1,2,3]},
                {level: 25, food: [1,2,3,4,5,6,7,8,9], book: [1,2,3,4]},
                {level: 27, food: [1,2,3,4,5,6,7,8,9,10], book: [1,2,3,4]}
            ]
        },
        {
            id: 6,
            data:  [  
                {level: 1,  food: [1], book: [1]},
                {level: 5,  food: [1,2], book: [1]},
                {level: 11, food: [1,2,3], book: [1,2]},
                {level: 13, food: [1,2,3,4], book: [1,2]},
                {level: 15, food: [1,2,3,4,5], book: [1,2]},
                {level: 17, food: [1,2,3,4,5,6], book: [1,2]},
                {level: 19, food: [1,2,3,4,5,6,7], book: [1,2,3]},
                {level: 21, food: [1,2,3,4,5,6,7,8], book: [1,2,3]},
                {level: 25, food: [1,2,3,4,5,6,7,8,9], book: [1,2,3,4]},
                {level: 27, food: [1,2,3,4,5,6,7,8,9,10], book: [1,2,3,4]}
            ]
        },
        {
            id: 7,
            data:  [  
                {level: 1,  food: [1], book: [1]},
                {level: 5,  food: [1,2], book: [1]},
                {level: 11, food: [1,2,3], book: [1,2]},
                {level: 13, food: [1,2,3,4], book: [1,2]},
                {level: 15, food: [1,2,3,4,5], book: [1,2]},
                {level: 17, food: [1,2,3,4,5,6], book: [1,2]},
                {level: 19, food: [1,2,3,4,5,6,7], book: [1,2,3]},
                {level: 21, food: [1,2,3,4,5,6,7,8], book: [1,2,3]},
                {level: 25, food: [1,2,3,4,5,6,7,8,9], book: [1,2,3,4]},
                {level: 27, food: [1,2,3,4,5,6,7,8,9,10], book: [1,2,3,4]}
            ]
        }
    ],

    levels:[
        {
            id: 1,
            data: [
                {level: 1, levelPoint: 0, maxGenCoin: 20, maxStickleCoin: 1, energy: 600},
                {level: 2, levelPoint: 50, maxGenCoin: 25, maxStickleCoin: 1, energy: 600},
                {level: 3, levelPoint: 100, maxGenCoin: 30, maxStickleCoin: 1, energy: 600},
                {level: 4, levelPoint: 150, maxGenCoin: 35, maxStickleCoin: 1, energy: 600},
                {level: 5, levelPoint: 200, maxGenCoin: 40, maxStickleCoin: 1, energy: 600},
                {level: 6, levelPoint: 250, maxGenCoin: 45, maxStickleCoin: 1, energy: 600},
                {level: 7, levelPoint: 300, maxGenCoin: 50, maxStickleCoin: 1, energy: 600},
                {level: 8, levelPoint: 350, maxGenCoin: 55, maxStickleCoin: 1, energy: 600},
                {level: 9, levelPoint: 400, maxGenCoin: 60, maxStickleCoin: 1, energy: 600},
                {level: 10, levelPoint: 450, maxGenCoin: 65, maxStickleCoin: 1, energy: 600},

                {level: 11, levelPoint: 550, maxGenCoin: 75, maxStickleCoin: 3, energy: 900},
                {level: 12, levelPoint: 650, maxGenCoin: 85, maxStickleCoin: 3, energy: 900},
                {level: 13, levelPoint: 750, maxGenCoin: 95, maxStickleCoin: 3, energy: 900},
                {level: 14, levelPoint: 850, maxGenCoin: 105, maxStickleCoin: 3, energy: 900},
                {level: 15, levelPoint: 950, maxGenCoin: 115, maxStickleCoin: 3, energy: 900},
                {level: 16, levelPoint: 1050, maxGenCoin: 125, maxStickleCoin: 3, energy: 900},
                {level: 17, levelPoint: 1150, maxGenCoin: 135, maxStickleCoin: 3, energy: 900},
                {level: 18, levelPoint: 1250, maxGenCoin: 145, maxStickleCoin: 3, energy: 900},

                {level: 19, levelPoint: 1750, maxGenCoin: 195, maxStickleCoin: 8, energy: 1800},
                {level: 20, levelPoint: 2250, maxGenCoin: 245, maxStickleCoin: 8, energy: 1800},
                {level: 21, levelPoint: 2750, maxGenCoin: 295, maxStickleCoin: 8, energy: 1800},
                {level: 22, levelPoint: 3250, maxGenCoin: 345, maxStickleCoin: 8, energy: 1800},
                {level: 23, levelPoint: 3750, maxGenCoin: 395, maxStickleCoin: 8, energy: 1800},
                {level: 24, levelPoint: 4250, maxGenCoin: 445, maxStickleCoin: 8, energy: 1800},

                {level: 25, levelPoint: 5750, maxGenCoin: 595, maxStickleCoin: 15, energy: 3600},
                {level: 26, levelPoint: 7250, maxGenCoin: 745, maxStickleCoin: 15, energy: 3600},
                {level: 27, levelPoint: 8750, maxGenCoin: 895, maxStickleCoin: 15, energy: 3600},
                {level: 28, levelPoint: 10250, maxGenCoin: 1045, maxStickleCoin: 15, energy: 3600},
                {level: 29, levelPoint: 11750, maxGenCoin: 1195, maxStickleCoin: 15, energy: 3600},
                {level: 30, levelPoint: 13250, maxGenCoin: 1345, maxStickleCoin: 15, energy: 3600}
            ]

            
        },
        {
            id: 2,
            data: [
                {level: 1, levelPoint: 0, maxGenCoin: 20, maxStickleCoin: 1, energy: 600},
                {level: 2, levelPoint: 50, maxGenCoin: 25, maxStickleCoin: 1, energy: 600},
                {level: 3, levelPoint: 100, maxGenCoin: 30, maxStickleCoin: 1, energy: 600},
                {level: 4, levelPoint: 150, maxGenCoin: 35, maxStickleCoin: 1, energy: 600},
                {level: 5, levelPoint: 200, maxGenCoin: 40, maxStickleCoin: 1, energy: 600},
                {level: 6, levelPoint: 250, maxGenCoin: 45, maxStickleCoin: 1, energy: 600},
                {level: 7, levelPoint: 300, maxGenCoin: 50, maxStickleCoin: 1, energy: 600},
                {level: 8, levelPoint: 350, maxGenCoin: 55, maxStickleCoin: 1, energy: 600},
                {level: 9, levelPoint: 400, maxGenCoin: 60, maxStickleCoin: 1, energy: 600},
                {level: 10, levelPoint: 450, maxGenCoin: 65, maxStickleCoin: 1, energy: 600},

                {level: 11, levelPoint: 550, maxGenCoin: 75, maxStickleCoin: 3, energy: 900},
                {level: 12, levelPoint: 650, maxGenCoin: 85, maxStickleCoin: 3, energy: 900},
                {level: 13, levelPoint: 750, maxGenCoin: 95, maxStickleCoin: 3, energy: 900},
                {level: 14, levelPoint: 850, maxGenCoin: 105, maxStickleCoin: 3, energy: 900},
                {level: 15, levelPoint: 950, maxGenCoin: 115, maxStickleCoin: 3, energy: 900},
                {level: 16, levelPoint: 1050, maxGenCoin: 125, maxStickleCoin: 3, energy: 900},
                {level: 17, levelPoint: 1150, maxGenCoin: 135, maxStickleCoin: 3, energy: 900},
                {level: 18, levelPoint: 1250, maxGenCoin: 145, maxStickleCoin: 3, energy: 900},

                {level: 19, levelPoint: 1750, maxGenCoin: 195, maxStickleCoin: 8, energy: 1800},
                {level: 20, levelPoint: 2250, maxGenCoin: 245, maxStickleCoin: 8, energy: 1800},
                {level: 21, levelPoint: 2750, maxGenCoin: 295, maxStickleCoin: 8, energy: 1800},
                {level: 22, levelPoint: 3250, maxGenCoin: 345, maxStickleCoin: 8, energy: 1800},
                {level: 23, levelPoint: 3750, maxGenCoin: 395, maxStickleCoin: 8, energy: 1800},
                {level: 24, levelPoint: 4250, maxGenCoin: 445, maxStickleCoin: 8, energy: 1800},

                {level: 25, levelPoint: 5750, maxGenCoin: 595, maxStickleCoin: 15, energy: 3600},
                {level: 26, levelPoint: 7250, maxGenCoin: 745, maxStickleCoin: 15, energy: 3600},
                {level: 27, levelPoint: 8750, maxGenCoin: 895, maxStickleCoin: 15, energy: 3600},
                {level: 28, levelPoint: 10250, maxGenCoin: 1045, maxStickleCoin: 15, energy: 3600},
                {level: 29, levelPoint: 11750, maxGenCoin: 1195, maxStickleCoin: 15, energy: 3600},
                {level: 30, levelPoint: 13250, maxGenCoin: 1345, maxStickleCoin: 15, energy: 3600}
            ]
        },
        {
            id: 3,
            data: [
                {level: 1, levelPoint: 0, maxGenCoin: 30, maxStickleCoin: 1, energy: 600},
                {level: 2, levelPoint: 60, maxGenCoin: 40, maxStickleCoin: 1, energy: 600},
                {level: 3, levelPoint: 120, maxGenCoin: 46, maxStickleCoin: 1, energy: 600},
                {level: 4, levelPoint: 180, maxGenCoin: 52, maxStickleCoin: 1, energy: 600},
                {level: 5, levelPoint: 240, maxGenCoin: 58, maxStickleCoin: 1, energy: 600},
                {level: 6, levelPoint: 300, maxGenCoin: 64, maxStickleCoin: 1, energy: 600},
                {level: 7, levelPoint: 360, maxGenCoin: 70, maxStickleCoin: 1, energy: 600},
                {level: 8, levelPoint: 420, maxGenCoin: 76, maxStickleCoin: 1, energy: 600},
                {level: 9, levelPoint: 480, maxGenCoin: 82, maxStickleCoin: 1, energy: 600},
                {level: 10, levelPoint: 540, maxGenCoin: 88, maxStickleCoin: 1, energy: 600},

                {level: 11, levelPoint: 660, maxGenCoin: 100, maxStickleCoin: 3, energy: 900},
                {level: 12, levelPoint: 780, maxGenCoin: 112, maxStickleCoin: 3, energy: 900},
                {level: 13, levelPoint: 900, maxGenCoin: 124, maxStickleCoin: 3, energy: 900},
                {level: 14, levelPoint: 1020, maxGenCoin: 136, maxStickleCoin: 3, energy: 900},
                {level: 15, levelPoint: 1140, maxGenCoin: 148, maxStickleCoin: 3, energy: 900},
                {level: 16, levelPoint: 1260, maxGenCoin: 160, maxStickleCoin: 3, energy: 900},
                {level: 17, levelPoint: 1380, maxGenCoin: 172, maxStickleCoin: 3, energy: 900},
                {level: 18, levelPoint: 1500, maxGenCoin: 184, maxStickleCoin: 3, energy: 900},

                {level: 19, levelPoint: 2100, maxGenCoin: 244, maxStickleCoin: 8, energy: 1800},
                {level: 20, levelPoint: 2700, maxGenCoin: 304, maxStickleCoin: 8, energy: 1800},
                {level: 21, levelPoint: 3300, maxGenCoin: 364, maxStickleCoin: 8, energy: 1800},
                {level: 22, levelPoint: 3900, maxGenCoin: 424, maxStickleCoin: 8, energy: 1800},
                {level: 23, levelPoint: 4500, maxGenCoin: 484, maxStickleCoin: 8, energy: 1800},
                {level: 24, levelPoint: 5100, maxGenCoin: 544, maxStickleCoin: 8, energy: 1800},

                {level: 25, levelPoint: 6900, maxGenCoin: 724, maxStickleCoin: 15, energy: 3600},
                {level: 26, levelPoint: 8700, maxGenCoin: 904, maxStickleCoin: 15, energy: 3600},
                {level: 27, levelPoint: 10500, maxGenCoin: 1084, maxStickleCoin: 15, energy: 3600},
                {level: 28, levelPoint: 12300, maxGenCoin: 1264, maxStickleCoin: 15, energy: 3600},
                {level: 29, levelPoint: 14100, maxGenCoin: 1444, maxStickleCoin: 15, energy: 3600},
                {level: 30, levelPoint: 15900, maxGenCoin: 1624, maxStickleCoin: 15, energy: 3600}
            ]
        },
        {
            id: 4,
            data:[
                {level: 1, levelPoint: 0, maxGenCoin: 30, maxStickleCoin: 1, energy: 600},
                {level: 2, levelPoint: 60, maxGenCoin: 40, maxStickleCoin: 1, energy: 600},
                {level: 3, levelPoint: 120, maxGenCoin: 46, maxStickleCoin: 1, energy: 600},
                {level: 4, levelPoint: 180, maxGenCoin: 52, maxStickleCoin: 1, energy: 600},
                {level: 5, levelPoint: 240, maxGenCoin: 58, maxStickleCoin: 1, energy: 600},
                {level: 6, levelPoint: 300, maxGenCoin: 64, maxStickleCoin: 1, energy: 600},
                {level: 7, levelPoint: 360, maxGenCoin: 70, maxStickleCoin: 1, energy: 600},
                {level: 8, levelPoint: 420, maxGenCoin: 76, maxStickleCoin: 1, energy: 600},
                {level: 9, levelPoint: 480, maxGenCoin: 82, maxStickleCoin: 1, energy: 600},
                {level: 10, levelPoint: 540, maxGenCoin: 88, maxStickleCoin: 1, energy: 600},

                {level: 11, levelPoint: 660, maxGenCoin: 100, maxStickleCoin: 3, energy: 900},
                {level: 12, levelPoint: 780, maxGenCoin: 112, maxStickleCoin: 3, energy: 900},
                {level: 13, levelPoint: 900, maxGenCoin: 124, maxStickleCoin: 3, energy: 900},
                {level: 14, levelPoint: 1020, maxGenCoin: 136, maxStickleCoin: 3, energy: 900},
                {level: 15, levelPoint: 1140, maxGenCoin: 148, maxStickleCoin: 3, energy: 900},
                {level: 16, levelPoint: 1260, maxGenCoin: 160, maxStickleCoin: 3, energy: 900},
                {level: 17, levelPoint: 1380, maxGenCoin: 172, maxStickleCoin: 3, energy: 900},
                {level: 18, levelPoint: 1500, maxGenCoin: 184, maxStickleCoin: 3, energy: 900},

                {level: 19, levelPoint: 2100, maxGenCoin: 244, maxStickleCoin: 8, energy: 1800},
                {level: 20, levelPoint: 2700, maxGenCoin: 304, maxStickleCoin: 8, energy: 1800},
                {level: 21, levelPoint: 3300, maxGenCoin: 364, maxStickleCoin: 8, energy: 1800},
                {level: 22, levelPoint: 3900, maxGenCoin: 424, maxStickleCoin: 8, energy: 1800},
                {level: 23, levelPoint: 4500, maxGenCoin: 484, maxStickleCoin: 8, energy: 1800},
                {level: 24, levelPoint: 5100, maxGenCoin: 544, maxStickleCoin: 8, energy: 1800},

                {level: 25, levelPoint: 6900, maxGenCoin: 724, maxStickleCoin: 15, energy: 3600},
                {level: 26, levelPoint: 8700, maxGenCoin: 904, maxStickleCoin: 15, energy: 3600},
                {level: 27, levelPoint: 10500, maxGenCoin: 1084, maxStickleCoin: 15, energy: 3600},
                {level: 28, levelPoint: 12300, maxGenCoin: 1264, maxStickleCoin: 15, energy: 3600},
                {level: 29, levelPoint: 14100, maxGenCoin: 1444, maxStickleCoin: 15, energy: 3600},
                {level: 30, levelPoint: 15900, maxGenCoin: 1624, maxStickleCoin: 15, energy: 3600}
            ]
        },
        {
            id: 5,
            data:[
                {level: 1, levelPoint: 0, maxGenCoin: 40, maxStickleCoin: 1, energy: 600},
                {level: 2, levelPoint: 70, maxGenCoin: 50, maxStickleCoin: 1, energy: 600},
                {level: 3, levelPoint: 140, maxGenCoin: 57, maxStickleCoin: 1, energy: 600},
                {level: 4, levelPoint: 210, maxGenCoin: 64, maxStickleCoin: 1, energy: 600},
                {level: 5, levelPoint: 280, maxGenCoin: 71, maxStickleCoin: 1, energy: 600},
                {level: 6, levelPoint: 350, maxGenCoin: 78, maxStickleCoin: 1, energy: 600},
                {level: 7, levelPoint: 420, maxGenCoin: 85, maxStickleCoin: 1, energy: 600},
                {level: 8, levelPoint: 490, maxGenCoin: 92, maxStickleCoin: 1, energy: 600},
                {level: 9, levelPoint: 560, maxGenCoin: 99, maxStickleCoin: 1, energy: 600},
                {level: 10, levelPoint: 630, maxGenCoin: 106, maxStickleCoin: 1, energy: 600},

                {level: 11, levelPoint: 770, maxGenCoin: 120, maxStickleCoin: 3, energy: 900},
                {level: 12, levelPoint: 910, maxGenCoin: 134, maxStickleCoin: 3, energy: 900},
                {level: 13, levelPoint: 1050, maxGenCoin: 148, maxStickleCoin: 3, energy: 900},
                {level: 14, levelPoint: 1190, maxGenCoin: 162, maxStickleCoin: 3, energy: 900},
                {level: 15, levelPoint: 1330, maxGenCoin: 176, maxStickleCoin: 3, energy: 900},
                {level: 16, levelPoint: 1470, maxGenCoin: 190, maxStickleCoin: 3, energy: 900},
                {level: 17, levelPoint: 1610, maxGenCoin: 204, maxStickleCoin: 3, energy: 900},
                {level: 18, levelPoint: 1750, maxGenCoin: 218, maxStickleCoin: 3, energy: 900},

                {level: 19, levelPoint: 2450, maxGenCoin: 288, maxStickleCoin: 8, energy: 1800},
                {level: 20, levelPoint: 3150, maxGenCoin: 358, maxStickleCoin: 8, energy: 1800},
                {level: 21, levelPoint: 3850, maxGenCoin: 428, maxStickleCoin: 8, energy: 1800},
                {level: 22, levelPoint: 4550, maxGenCoin: 498, maxStickleCoin: 8, energy: 1800},
                {level: 23, levelPoint: 5250, maxGenCoin: 568, maxStickleCoin: 8, energy: 1800},
                {level: 24, levelPoint: 5950, maxGenCoin: 638, maxStickleCoin: 8, energy: 1800},

                {level: 25, levelPoint: 8050, maxGenCoin: 848, maxStickleCoin: 15, energy: 3600},
                {level: 26, levelPoint: 10150, maxGenCoin: 1058, maxStickleCoin: 15, energy: 3600},
                {level: 27, levelPoint: 12250, maxGenCoin: 1268, maxStickleCoin: 15, energy: 3600},
                {level: 28, levelPoint: 14350, maxGenCoin: 1478, maxStickleCoin: 15, energy: 3600},
                {level: 29, levelPoint: 16450, maxGenCoin: 1688, maxStickleCoin: 15, energy: 3600},
                {level: 30, levelPoint: 18550, maxGenCoin: 1898, maxStickleCoin: 15, energy: 3600}
            ]
        },
        {
            id: 6,
            data:[
                {level: 1, levelPoint: 0, maxGenCoin: 50, maxStickleCoin: 1, energy: 600},
                {level: 2, levelPoint: 80, maxGenCoin: 60, maxStickleCoin: 1, energy: 600},
                {level: 3, levelPoint: 160, maxGenCoin: 68, maxStickleCoin: 1, energy: 600},
                {level: 4, levelPoint: 240, maxGenCoin: 76, maxStickleCoin: 1, energy: 600},
                {level: 5, levelPoint: 320, maxGenCoin: 84, maxStickleCoin: 1, energy: 600},
                {level: 6, levelPoint: 400, maxGenCoin: 92, maxStickleCoin: 1, energy: 600},
                {level: 7, levelPoint: 480, maxGenCoin: 100, maxStickleCoin: 1, energy: 600},
                {level: 8, levelPoint: 560, maxGenCoin: 108, maxStickleCoin: 1, energy: 600},
                {level: 9, levelPoint: 640, maxGenCoin: 116, maxStickleCoin: 1, energy: 600},
                {level: 10, levelPoint: 720, maxGenCoin: 124, maxStickleCoin: 1, energy: 600},

                {level: 11, levelPoint: 880, maxGenCoin: 140, maxStickleCoin: 3, energy: 900},
                {level: 12, levelPoint: 1040, maxGenCoin: 156, maxStickleCoin: 3, energy: 900},
                {level: 13, levelPoint: 1200, maxGenCoin: 172, maxStickleCoin: 3, energy: 900},
                {level: 14, levelPoint: 1360, maxGenCoin: 188, maxStickleCoin: 3, energy: 900},
                {level: 15, levelPoint: 1520, maxGenCoin: 204, maxStickleCoin: 3, energy: 900},
                {level: 16, levelPoint: 1680, maxGenCoin: 220, maxStickleCoin: 3, energy: 900},
                {level: 17, levelPoint: 1840, maxGenCoin: 236, maxStickleCoin: 3, energy: 900},
                {level: 18, levelPoint: 2000, maxGenCoin: 252, maxStickleCoin: 3, energy: 900},

                {level: 19, levelPoint: 2800, maxGenCoin: 332, maxStickleCoin: 8, energy: 1800},
                {level: 20, levelPoint: 3600, maxGenCoin: 412, maxStickleCoin: 8, energy: 1800},
                {level: 21, levelPoint: 4400, maxGenCoin: 492, maxStickleCoin: 8, energy: 1800},
                {level: 22, levelPoint: 5200, maxGenCoin: 572, maxStickleCoin: 8, energy: 1800},
                {level: 23, levelPoint: 6000, maxGenCoin: 652, maxStickleCoin: 8, energy: 1800},
                {level: 24, levelPoint: 6800, maxGenCoin: 732, maxStickleCoin: 8, energy: 1800},

                {level: 25, levelPoint: 9200, maxGenCoin: 972, maxStickleCoin: 15, energy: 3600},
                {level: 26, levelPoint: 11600, maxGenCoin: 1212, maxStickleCoin: 15, energy: 3600},
                {level: 27, levelPoint: 14000, maxGenCoin: 1452, maxStickleCoin: 15, energy: 3600},
                {level: 28, levelPoint: 16400, maxGenCoin: 1692, maxStickleCoin: 15, energy: 3600},
                {level: 29, levelPoint: 18800, maxGenCoin: 1932, maxStickleCoin: 15, energy: 3600},
                {level: 30, levelPoint: 21200, maxGenCoin: 2172, maxStickleCoin: 15, energy: 3600}
            ]
        },
        {
            id: 7,
            data:[
                {level: 1, levelPoint: 0, maxGenCoin: 70, maxStickleCoin: 1, energy: 600},
                {level: 2, levelPoint: 100, maxGenCoin: 90, maxStickleCoin: 1, energy: 600},
                {level: 3, levelPoint: 200, maxGenCoin: 100, maxStickleCoin: 1, energy: 600},
                {level: 4, levelPoint: 300, maxGenCoin: 110, maxStickleCoin: 1, energy: 600},
                {level: 5, levelPoint: 400, maxGenCoin: 120, maxStickleCoin: 1, energy: 600},
                {level: 6, levelPoint: 500, maxGenCoin: 130, maxStickleCoin: 1, energy: 600},
                {level: 7, levelPoint: 600, maxGenCoin: 140, maxStickleCoin: 1, energy: 600},
                {level: 8, levelPoint: 700, maxGenCoin: 150, maxStickleCoin: 1, energy: 600},
                {level: 9, levelPoint: 800, maxGenCoin: 160, maxStickleCoin: 1, energy: 600},
                {level: 10, levelPoint: 900, maxGenCoin: 170, maxStickleCoin: 1, energy: 600},

                {level: 11, levelPoint: 1100, maxGenCoin: 190, maxStickleCoin: 3, energy: 900},
                {level: 12, levelPoint: 1300, maxGenCoin: 210, maxStickleCoin: 3, energy: 900},
                {level: 13, levelPoint: 1500, maxGenCoin: 230, maxStickleCoin: 3, energy: 900},
                {level: 14, levelPoint: 1700, maxGenCoin: 250, maxStickleCoin: 3, energy: 900},
                {level: 15, levelPoint: 1900, maxGenCoin: 270, maxStickleCoin: 3, energy: 900},
                {level: 16, levelPoint: 2100, maxGenCoin: 290, maxStickleCoin: 3, energy: 900},
                {level: 17, levelPoint: 2300, maxGenCoin: 310, maxStickleCoin: 3, energy: 900},
                {level: 18, levelPoint: 2500, maxGenCoin: 330, maxStickleCoin: 3, energy: 900},

                {level: 19, levelPoint: 3500, maxGenCoin: 430, maxStickleCoin: 8, energy: 1800},
                {level: 20, levelPoint: 4500, maxGenCoin: 530, maxStickleCoin: 8, energy: 1800},
                {level: 21, levelPoint: 5500, maxGenCoin: 630, maxStickleCoin: 8, energy: 1800},
                {level: 22, levelPoint: 6500, maxGenCoin: 730, maxStickleCoin: 8, energy: 1800},
                {level: 23, levelPoint: 7500, maxGenCoin: 830, maxStickleCoin: 8, energy: 1800},
                {level: 24, levelPoint: 8500, maxGenCoin: 930, maxStickleCoin: 8, energy: 1800},

                {level: 25, levelPoint: 11500, maxGenCoin: 1230, maxStickleCoin: 15, energy: 3600},
                {level: 26, levelPoint: 14500, maxGenCoin: 1530, maxStickleCoin: 15, energy: 3600},
                {level: 27, levelPoint: 17500, maxGenCoin: 1830, maxStickleCoin: 15, energy: 3600},
                {level: 28, levelPoint: 20500, maxGenCoin: 2130, maxStickleCoin: 15, energy: 3600},
                {level: 29, levelPoint: 23500, maxGenCoin: 2430, maxStickleCoin: 15, energy: 3600},
                {level: 30, levelPoint: 26500, maxGenCoin: 2730, maxStickleCoin: 15, energy: 3600}
            ]
        }
    ],
    
    characters:[
        {
            id: 1,
            name: "Elmo",
            scanCoin: 500,
            stickleCoin:0,
            happyTime: 3600           
        },
        {
            id: 2,
            name:"Grover",
            scanCoin: 500,
            stickleCoin:0,
            happyTime: 3600
            
        },
        {
            id: 3,
            name:"Von Count",
            scanCoin: 600,
            stickleCoin:0,
            happyTime: 3600            
        },
        {
            id: 4,
            name:"Big Bird",
            scanCoin: 600,
            stickleCoin:0,
            happyTime: 3600            
        },
        {
            id: 5,
            name:"Cadabby",
            scanCoin: 700,
            stickleCoin:0,
            happyTime: 3600            
        },
        {
            id: 6,
            name:"Bert",
            scanCoin: 800,
            stickleCoin:0,
            happyTime: 3600            
        },
        {
            id: 7,
            name:"Ernine",
            scanCoin: 1000,
            stickleCoin:0,
            happyTime: 3600            
        }
    ]
}