var app = require("../app");

app.controller('mainPage', function ($scope) {
    $scope.items = [            // $scope – специальный объект, который задает параметры отображения переменной.
        {
            name: 'Дом',
            description: 'Мебель для спальни, кухни, офиса',
            link: '#/page/room',
            imgLink: 'image/photo/big/room/DSC_8339.jpg'
        },
        {
            name: 'Кресло-качалка',
            description: 'Описание кресел-качалок',
            link: '#/page/rocking_chair',
            imgLink: 'image/photo/big/rocking_chair/DSC_9464.jpg'
        },
        {
            name: 'Садовая мебель',
            description: 'Мебель для сада, бани, беседки',
            link: '#/page/garden_furniture',
            imgLink: 'image/photo/big/garden_furniture/DSC_9448.jpg'
        },
        {
            name: 'Кухонная мебель',
            description: 'Мебель для кухни',
            link: '#/page/kitchen',
            imgLink: 'image/photo/big/kitchen/DSC_9486.jpg'
        },
        {
            name: 'Прочее',
            description: 'Прочие мелочи',
            link: '#/page/other',
            imgLink: 'image/photo/big/other/DSC_9477.jpg'
        },
        {
            name: 'Детская мебель',
            description: 'Мебель для детей, игрушки',
            link: '#/page/baby',
            imgLink: 'image/photo/big/baby/DSC_9654.jpg'
        }
    ];

});