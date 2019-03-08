
/*
 Response type:
{
    "kind": "books#volumes",
    "totalItems": 332,
    "items": [
        {
            "kind": "books#volume",
            "id": "vgzE0V3GqicC",
            "etag": "jIUDe7NoDlE",
            "selfLink": "https://www.googleapis.com/books/v1/volumes/vgzE0V3GqicC",
            "volumeInfo": {
                "title": "In at the Death",
                "subtitle": "Settling Accounts, Book Four",
                "authors": [
                    "Harry Turtledove"
                ],
                "publisher": "Del Rey",
                "publishedDate": "2007-07-31",
                "description": "Franklin Roosevelt is the assistant secretary of defense. Thomas Dewey is running for president with a blunt-speaking Missourian named Harry Truman at his side. Britain holds onto its desperate alliance with the USA’s worst enemy, while a holocaust unfolds in Texas. In Harry Turtledove’s compelling, disturbing, and extraordinarily vivid reshaping of American history, a war of secession has triggered a generation of madness. The tipping point has come at last. The third war in sixty years, this one yet unnamed: a grinding, horrifying series of hostilities and atrocities between two nations sharing the same continent and both calling themselves Americans. At the dawn of 1944, the United States has beaten back a daredevil blitzkrieg from the Confederate States–and a terrible new genie is out of history’s bottle: a bomb that may destroy on a scale never imagined before. In Europe, the new weapon has shattered a stalemate between Germany, England, and Russia. When the trigger is pulled in America, nothing will be the same again. With visionary brilliance, Harry Turtledove brings to a climactic conclusion his monumental, acclaimed drama of a nation’s tragedy and the men and women who play their roles–with valor, fear, and folly–on history’s greatest stage. From the Hardcover edition.",
                "industryIdentifiers": [
                    {
                        "type": "ISBN_13",
                        "identifier": "9780345500519"
                    },
                    {
                        "type": "ISBN_10",
                        "identifier": "0345500512"
                    }
                ],
                "readingModes": {
                    "text": true,
                    "image": true
                },
                "pageCount": 624,
                "printType": "BOOK",
                "categories": [
                    "Fiction"
                ],
                "averageRating": 3.5,
                "ratingsCount": 4,
                "maturityRating": "NOT_MATURE",
                "allowAnonLogging": true,
                "contentVersion": "0.2.1.0.preview.3",
                "panelizationSummary": {
                    "containsEpubBubbles": false,
                    "containsImageBubbles": false
                },
                "imageLinks": {
                    "smallThumbnail": "http://books.google.com/books/content?id=vgzE0V3GqicC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                    "thumbnail": "http://books.google.com/books/content?id=vgzE0V3GqicC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
                },
                "language": "en",
                "previewLink": "http://books.google.hu/books?id=vgzE0V3GqicC&pg=PT8&dq=inauthor:harry+potter&hl=&cd=1&source=gbs_api",
                "infoLink": "https://play.google.com/store/books/details?id=vgzE0V3GqicC&source=gbs_api",
                "canonicalVolumeLink": "https://market.android.com/details?id=book-vgzE0V3GqicC"
            },
            "saleInfo": {
                "country": "HU",
                "saleability": "FOR_SALE",
                "isEbook": true,
                "listPrice": {
                    "amount": 5341,
                    "currencyCode": "HUF"
                },
                "retailPrice": {
                    "amount": 3739,
                    "currencyCode": "HUF"
                },
                "buyLink": "https://play.google.com/store/books/details?id=vgzE0V3GqicC&rdid=book-vgzE0V3GqicC&rdot=1&source=gbs_api",
                "offers": [
                    {
                        "finskyOfferType": 1,
                        "listPrice": {
                            "amountInMicros": 5341000000,
                            "currencyCode": "HUF"
                        },
                        "retailPrice": {
                            "amountInMicros": 3739000000,
                            "currencyCode": "HUF"
                        }
                    }
                ]
            },
            "accessInfo": {
                "country": "HU",
                "viewability": "PARTIAL",
                "embeddable": true,
                "publicDomain": false,
                "textToSpeechPermission": "ALLOWED_FOR_ACCESSIBILITY",
                "epub": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.hu/books/download/In_at_the_Death-sample-epub.acsm?id=vgzE0V3GqicC&format=epub&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "pdf": {
                    "isAvailable": true,
                    "acsTokenLink": "http://books.google.hu/books/download/In_at_the_Death-sample-pdf.acsm?id=vgzE0V3GqicC&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api"
                },
                "webReaderLink": "http://play.google.com/books/reader?id=vgzE0V3GqicC&hl=&printsec=frontcover&source=gbs_api",
                "accessViewStatus": "SAMPLE",
                "quoteSharingAllowed": false
            },
            "searchInfo": {
                "textSnippet": "“And I&#39;m liable to get killed by mistake,” <b>Potter</b> muttered. He was in his early <br>\nsixties, in good hard shape for his age, with iron-gray hair and cold gray eyes <br>\nbehind steel-rimmed spectacles. His specialty was intelligence work, but he <br>\ncommanded&nbsp;..."
            }
        },
    }
}
*/

export class Book {
    constructor(
        public title?: string,
        public subtitle?: string,
        public authors?: string,
        public description?: string,
        public publishedDate? :string,
        public pageCount?: number | null,
        public previewLink?: string,
        public infoLink?: string,
        public averageRating?: number | null,
        public categories?: string[],
        public smallThumbnailUrl?: string
    ) {}
}