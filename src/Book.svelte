
<div class="book">
    <a class="book-a" href={ `g/${book.id}` }>
        
        <img class="book-cover" src={ nh.getThumbUrl(book) }
            alt="">
            <!-- width={ book.images.cover.w }
            height={ book.images.cover.h }> -->

        <div class="book-caption">
            <img
            src={ nh.getFlag(book) }
            class="flag"
            alt="">
            <div class=title>{ book.title.japanese || book.title.english || 'no title'  }</div>
        </div>

    </a>
</div>

<script>
    import Nhentai from './nhentai';
    export let book = {};
    let nh = new Nhentai();

</script>

<style>
    .book {
        margin: 3px;
    }

    .book-a {
        display: flex;
        flex-direction: column;
        width: 200px;
    }

    .book-cover {
        object-fit: contain;
        border-top-left-radius: 0.3em;
        border-top-right-radius: 0.3em;
    }

    .book-caption {
        background-color: #404040;
        border-bottom-left-radius: 0.3em;
        border-bottom-right-radius: 0.3em;
        color: #d9d9d9;
        display: flex;
        flex-direction: row;
        font-weight: 700;
        line-height: 15px;
        max-height: 34px;
        overflow: hidden;
        padding: 3px;
    }

    .book-caption .flag {
        height: 12px;
        width: 18px;
    }

    .book-caption .title {
        flex-grow: 1;
    }

</style>