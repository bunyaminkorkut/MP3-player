class Music{
    constructor(title, singer, img, file){
        this.title= title;
        this.singer= singer;
        this.img= img;
        this.file= file;
    }
    getname(){
        return this.title + "-" + this.singer
    }
}

const musiclist = [
    new Music('Boşver', 'Nilüfer', '1.jpeg', '1.mp3'),
    new Music('Bu da Geçer mi Sevgilim', 'Yalın', '2.jpeg', '2.mp3'),
    new Music('Aramızda Uçurumlar', 'Suat Suna', '3.jpeg', '3.mp3'),
    new Music('Gönlüm Ataşlara Yandı Gidiyor' , 'Kerim Yağcı' , '4.webp' ,'4.mp3'),
    new Music('Makina' , 'Uzi' , '5.webp' ,'5.mp3'),
]