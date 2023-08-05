const CountriesUk = [
  { id: 36, name: "Австралія", alpha2: "au", alpha3: "aus" },
  { id: 40, name: "Австрія", alpha2: "at", alpha3: "aut" },
  { id: 31, name: "Азербайджан", alpha2: "az", alpha3: "aze" },
  { id: 8, name: "Албанія", alpha2: "al", alpha3: "alb" },
  { id: 12, name: "Алжир", alpha2: "dz", alpha3: "dza" },
  { id: 24, name: "Ангола", alpha2: "ao", alpha3: "ago" },
  { id: 20, name: "Андорра", alpha2: "ad", alpha3: "and" },
  { id: 28, name: "Антигуа і Барбуда", alpha2: "ag", alpha3: "atg" },
  { id: 32, name: "Аргентина", alpha2: "ar", alpha3: "arg" },
  { id: 4, name: "Афганістан", alpha2: "af", alpha3: "afg" },
  { id: 44, name: "Багамські Острови", alpha2: "bs", alpha3: "bhs" },
  { id: 50, name: "Бангладеш", alpha2: "bd", alpha3: "bgd" },
  { id: 52, name: "Барбадос", alpha2: "bb", alpha3: "brb" },
  { id: 48, name: "Бахрейн", alpha2: "bh", alpha3: "bhr" },
  { id: 84, name: "Беліз", alpha2: "bz", alpha3: "blz" },
  { id: 56, name: "Бельгія", alpha2: "be", alpha3: "bel" },
  { id: 204, name: "Бенін", alpha2: "bj", alpha3: "ben" },
  { id: 112, name: "Білорусь", alpha2: "by", alpha3: "blr" },
  { id: 100, name: "Болгарія", alpha2: "bg", alpha3: "bgr" },
  { id: 68, name: "Болівія", alpha2: "bo", alpha3: "bol" },
  { id: 70, name: "Боснія і Герцеговина", alpha2: "ba", alpha3: "bih" },
  { id: 72, name: "Ботсвана", alpha2: "bw", alpha3: "bwa" },
  { id: 76, name: "Бразилія", alpha2: "br", alpha3: "bra" },
  { id: 96, name: "Бруней", alpha2: "bn", alpha3: "brn" },
  { id: 854, name: "Буркіна-Фасо", alpha2: "bf", alpha3: "bfa" },
  { id: 108, name: "Бурунді", alpha2: "bi", alpha3: "bdi" },
  { id: 64, name: "Бутан", alpha2: "bt", alpha3: "btn" },
  { id: 548, name: "Вануату", alpha2: "vu", alpha3: "vut" },
  { id: 826, name: "Велика Британія", alpha2: "gb", alpha3: "gbr" },
  { id: 862, name: "Венесуела", alpha2: "ve", alpha3: "ven" },
  { id: 704, name: "В'єтнам", alpha2: "vn", alpha3: "vnm" },
  { id: 51, name: "Вірменія", alpha2: "am", alpha3: "arm" },
  { id: 266, name: "Габон", alpha2: "ga", alpha3: "gab" },
  { id: 332, name: "Гаїті", alpha2: "ht", alpha3: "hti" },
  { id: 328, name: "Гаяна", alpha2: "gy", alpha3: "guy" },
  { id: 270, name: "Гамбія", alpha2: "gm", alpha3: "gmb" },
  { id: 288, name: "Гана", alpha2: "gh", alpha3: "gha" },
  { id: 320, name: "Гватемала", alpha2: "gt", alpha3: "gtm" },
  { id: 324, name: "Гвінея", alpha2: "gn", alpha3: "gin" },
  { id: 624, name: "Гвінея-Бісау", alpha2: "gw", alpha3: "gnb" },
  { id: 340, name: "Гондурас", alpha2: "hn", alpha3: "hnd" },
  { id: 308, name: "Гренада", alpha2: "gd", alpha3: "grd" },
  { id: 300, name: "Греція", alpha2: "gr", alpha3: "grc" },
  { id: 268, name: "Грузія", alpha2: "ge", alpha3: "geo" },
  { id: 208, name: "Данія", alpha2: "dk", alpha3: "dnk" },
  { id: 180, name: "ДР Конго", alpha2: "cd", alpha3: "cod" },
  { id: 262, name: "Джибуті", alpha2: "dj", alpha3: "dji" },
  { id: 212, name: "Домініка", alpha2: "dm", alpha3: "dma" },
  { id: 214, name: "Домініканська Республіка", alpha2: "do", alpha3: "dom" },
  { id: 218, name: "Еквадор", alpha2: "ec", alpha3: "ecu" },
  { id: 226, name: "Екваторіальна Гвінея", alpha2: "gq", alpha3: "gnq" },
  { id: 232, name: "Еритрея", alpha2: "er", alpha3: "eri" },
  { id: 233, name: "Естонія", alpha2: "ee", alpha3: "est" },
  { id: 231, name: "Ефіопія", alpha2: "et", alpha3: "eth" },
  { id: 818, name: "Єгипет", alpha2: "eg", alpha3: "egy" },
  { id: 887, name: "Ємен", alpha2: "ye", alpha3: "yem" },
  { id: 894, name: "Замбія", alpha2: "zm", alpha3: "zmb" },
  { id: 716, name: "Зімбабве", alpha2: "zw", alpha3: "zwe" },
  { id: 376, name: "Ізраїль", alpha2: "il", alpha3: "isr" },
  { id: 356, name: "Індія", alpha2: "in", alpha3: "ind" },
  { id: 360, name: "Індонезія", alpha2: "id", alpha3: "idn" },
  { id: 368, name: "Ірак", alpha2: "iq", alpha3: "irq" },
  { id: 364, name: "Іран", alpha2: "ir", alpha3: "irn" },
  { id: 372, name: "Ірландія", alpha2: "ie", alpha3: "irl" },
  { id: 352, name: "Ісландія", alpha2: "is", alpha3: "isl" },
  { id: 724, name: "Іспанія", alpha2: "es", alpha3: "esp" },
  { id: 380, name: "Італія", alpha2: "it", alpha3: "ita" },
  { id: 400, name: "Йорданія", alpha2: "jo", alpha3: "jor" },
  { id: 132, name: "Кабо-Верде", alpha2: "cv", alpha3: "cpv" },
  { id: 398, name: "Казахстан", alpha2: "kz", alpha3: "kaz" },
  { id: 116, name: "Камбоджа", alpha2: "kh", alpha3: "khm" },
  { id: 120, name: "Камерун", alpha2: "cm", alpha3: "cmr" },
  { id: 124, name: "Канада", alpha2: "ca", alpha3: "can" },
  { id: 634, name: "Катар", alpha2: "qa", alpha3: "qat" },
  { id: 404, name: "Кенія", alpha2: "ke", alpha3: "ken" },
  { id: 417, name: "Киргизстан", alpha2: "kg", alpha3: "kgz" },
  { id: 156, name: "Китайська Народна Республіка", alpha2: "cn", alpha3: "chn" },
  { id: 196, name: "Кіпр", alpha2: "cy", alpha3: "cyp" },
  { id: 296, name: "Кірибаті", alpha2: "ki", alpha3: "kir" },
  { id: 170, name: "Колумбія", alpha2: "co", alpha3: "col" },
  { id: 174, name: "Коморські Острови", alpha2: "km", alpha3: "com" },
  { id: 178, name: "Республіка Конго", alpha2: "cg", alpha3: "cog" },
  { id: 188, name: "Коста-Рика", alpha2: "cr", alpha3: "cri" },
  { id: 384, name: "Кот-д'Івуар", alpha2: "ci", alpha3: "civ" },
  { id: 192, name: "Куба", alpha2: "cu", alpha3: "cub" },
  { id: 414, name: "Кувейт", alpha2: "kw", alpha3: "kwt" },
  { id: 418, name: "Лаос", alpha2: "la", alpha3: "lao" },
  { id: 428, name: "Латвія", alpha2: "lv", alpha3: "lva" },
  { id: 426, name: "Лесото", alpha2: "ls", alpha3: "lso" },
  { id: 440, name: "Литва", alpha2: "lt", alpha3: "ltu" },
  { id: 430, name: "Ліберія", alpha2: "lr", alpha3: "lbr" },
  { id: 422, name: "Ліван", alpha2: "lb", alpha3: "lbn" },
  { id: 434, name: "Лівія", alpha2: "ly", alpha3: "lby" },
  { id: 438, name: "Ліхтенштейн", alpha2: "li", alpha3: "lie" },
  { id: 442, name: "Люксембург", alpha2: "lu", alpha3: "lux" },
  { id: 480, name: "Маврикій", alpha2: "mu", alpha3: "mus" },
  { id: 478, name: "Мавританія", alpha2: "mr", alpha3: "mrt" },
  { id: 450, name: "Мадагаскар", alpha2: "mg", alpha3: "mdg" },
  { id: 454, name: "Малаві", alpha2: "mw", alpha3: "mwi" },
  { id: 458, name: "Малайзія", alpha2: "my", alpha3: "mys" },
  { id: 466, name: "Малі", alpha2: "ml", alpha3: "mli" },
  { id: 462, name: "Мальдіви", alpha2: "mv", alpha3: "mdv" },
  { id: 470, name: "Мальта", alpha2: "mt", alpha3: "mlt" },
  { id: 504, name: "Марокко", alpha2: "ma", alpha3: "mar" },
  { id: 584, name: "Маршаллові Острови", alpha2: "mh", alpha3: "mhl" },
  { id: 484, name: "Мексика", alpha2: "mx", alpha3: "mex" },
  { id: 508, name: "Мозамбік", alpha2: "mz", alpha3: "moz" },
  { id: 498, name: "Молдова", alpha2: "md", alpha3: "mda" },
  { id: 492, name: "Монако", alpha2: "mc", alpha3: "mco" },
  { id: 496, name: "Монголія", alpha2: "mn", alpha3: "mng" },
  { id: 104, name: "М'янма", alpha2: "mm", alpha3: "mmr" },
  { id: 516, name: "Намібія", alpha2: "na", alpha3: "nam" },
  { id: 520, name: "Науру", alpha2: "nr", alpha3: "nru" },
  { id: 524, name: "Непал", alpha2: "np", alpha3: "npl" },
  { id: 562, name: "Нігер", alpha2: "ne", alpha3: "ner" },
  { id: 566, name: "Нігерія", alpha2: "ng", alpha3: "nga" },
  { id: 528, name: "Нідерланди", alpha2: "nl", alpha3: "nld" },
  { id: 558, name: "Нікарагуа", alpha2: "ni", alpha3: "nic" },
  { id: 276, name: "Німеччина", alpha2: "de", alpha3: "deu" },
  { id: 554, name: "Нова Зеландія", alpha2: "nz", alpha3: "nzl" },
  { id: 578, name: "Норвегія", alpha2: "no", alpha3: "nor" },
  { id: 784, name: "ОАЕ", alpha2: "ae", alpha3: "are" },
  { id: 512, name: "Оман", alpha2: "om", alpha3: "omn" },
  { id: 586, name: "Пакистан", alpha2: "pk", alpha3: "pak" },
  { id: 585, name: "Палау", alpha2: "pw", alpha3: "plw" },
  { id: 591, name: "Панама", alpha2: "pa", alpha3: "pan" },
  { id: 598, name: "Папуа Нова Гвінея", alpha2: "pg", alpha3: "png" },
  { id: 600, name: "Парагвай", alpha2: "py", alpha3: "pry" },
  { id: 604, name: "Перу", alpha2: "pe", alpha3: "per" },
  { id: 710, name: "ПАР", alpha2: "za", alpha3: "zaf" },
  { id: 410, name: "Південна Корея", alpha2: "kr", alpha3: "kor" },
  { id: 728, name: "Південний Судан", alpha2: "ss", alpha3: "ssd" },
  { id: 408, name: "Північна Корея", alpha2: "kp", alpha3: "prk" },
  { id: 807, name: "Північна Македонія", alpha2: "mk", alpha3: "mkd" },
  { id: 616, name: "Польща", alpha2: "pl", alpha3: "pol" },
  { id: 620, name: "Португалія", alpha2: "pt", alpha3: "prt" },
  { id: 643, name: "Росія", alpha2: "ru", alpha3: "rus" },
  { id: 646, name: "Руанда", alpha2: "rw", alpha3: "rwa" },
  { id: 642, name: "Румунія", alpha2: "ro", alpha3: "rou" },
  { id: 222, name: "Сальвадор", alpha2: "sv", alpha3: "slv" },
  { id: 882, name: "Самоа", alpha2: "ws", alpha3: "wsm" },
  { id: 674, name: "Сан-Марино", alpha2: "sm", alpha3: "smr" },
  { id: 678, name: "Сан-Томе і Принсіпі", alpha2: "st", alpha3: "stp" },
  { id: 682, name: "Саудівська Аравія", alpha2: "sa", alpha3: "sau" },
  { id: 748, name: "Есватіні", alpha2: "sz", alpha3: "swz" },
  { id: 690, name: "Сейшельські Острови", alpha2: "sc", alpha3: "syc" },
  { id: 686, name: "Сенегал", alpha2: "sn", alpha3: "sen" },
  { id: 670, name: "Сент-Вінсент і Гренадини", alpha2: "vc", alpha3: "vct" },
  { id: 659, name: "Сент-Кіттс і Невіс", alpha2: "kn", alpha3: "kna" },
  { id: 662, name: "Сент-Люсія", alpha2: "lc", alpha3: "lca" },
  { id: 688, name: "Сербія", alpha2: "rs", alpha3: "srb" },
  { id: 760, name: "Сирія", alpha2: "sy", alpha3: "syr" },
  { id: 702, name: "Сінгапур", alpha2: "sg", alpha3: "sgp" },
  { id: 703, name: "Словаччина", alpha2: "sk", alpha3: "svk" },
  { id: 705, name: "Словенія", alpha2: "si", alpha3: "svn" },
  { id: 90, name: "Соломонові Острови", alpha2: "sb", alpha3: "slb" },
  { id: 706, name: "Сомалі", alpha2: "so", alpha3: "som" },
  { id: 840, name: "США", alpha2: "us", alpha3: "usa" },
  { id: 729, name: "Судан", alpha2: "sd", alpha3: "sdn" },
  { id: 740, name: "Суринам", alpha2: "sr", alpha3: "sur" },
  { id: 626, name: "Східний Тимор", alpha2: "tl", alpha3: "tls" },
  { id: 694, name: "Сьєрра-Леоне", alpha2: "sl", alpha3: "sle" },
  { id: 762, name: "Таджикистан", alpha2: "tj", alpha3: "tjk" },
  { id: 764, name: "Таїланд", alpha2: "th", alpha3: "tha" },
  { id: 834, name: "Танзанія", alpha2: "tz", alpha3: "tza" },
  { id: 768, name: "Того", alpha2: "tg", alpha3: "tgo" },
  { id: 776, name: "Тонга", alpha2: "to", alpha3: "ton" },
  { id: 780, name: "Тринідад і Тобаго", alpha2: "tt", alpha3: "tto" },
  { id: 798, name: "Тувалу", alpha2: "tv", alpha3: "tuv" },
  { id: 788, name: "Туніс", alpha2: "tn", alpha3: "tun" },
  { id: 792, name: "Туреччина", alpha2: "tr", alpha3: "tur" },
  { id: 795, name: "Туркменістан", alpha2: "tm", alpha3: "tkm" },
  { id: 800, name: "Уганда", alpha2: "ug", alpha3: "uga" },
  { id: 348, name: "Угорщина", alpha2: "hu", alpha3: "hun" },
  { id: 860, name: "Узбекистан", alpha2: "uz", alpha3: "uzb" },
  { id: 804, name: "Україна", alpha2: "ua", alpha3: "ukr" },
  { id: 858, name: "Уругвай", alpha2: "uy", alpha3: "ury" },
  { id: 583, name: "Федеративні Штати Мікронезії", alpha2: "fm", alpha3: "fsm" },
  { id: 242, name: "Фіджі", alpha2: "fj", alpha3: "fji" },
  { id: 608, name: "Філіппіни", alpha2: "ph", alpha3: "phl" },
  { id: 246, name: "Фінляндія", alpha2: "fi", alpha3: "fin" },
  { id: 250, name: "Франція", alpha2: "fr", alpha3: "fra" },
  { id: 191, name: "Хорватія", alpha2: "hr", alpha3: "hrv" },
  { id: 140, name: "ЦАР", alpha2: "cf", alpha3: "caf" },
  { id: 148, name: "Чад", alpha2: "td", alpha3: "tcd" },
  { id: 203, name: "Чехія", alpha2: "cz", alpha3: "cze" },
  { id: 152, name: "Чилі", alpha2: "cl", alpha3: "chl" },
  { id: 499, name: "Чорногорія", alpha2: "me", alpha3: "mne" },
  { id: 756, name: "Швейцарія", alpha2: "ch", alpha3: "che" },
  { id: 752, name: "Швеція", alpha2: "se", alpha3: "swe" },
  { id: 144, name: "Шрі-Ланка", alpha2: "lk", alpha3: "lka" },
  { id: 388, name: "Ямайка", alpha2: "jm", alpha3: "jam" },
  { id: 392, name: "Японія", alpha2: "jp", alpha3: "jpn" },
];

export default CountriesUk;