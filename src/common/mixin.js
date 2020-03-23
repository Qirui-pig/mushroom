// export const BACK_POSITION = 1000;
import {debounce} from './utils';
import BackTop from 'components/content/backTop/BackTop';

export const itemListenerMixin = {
    data(){
        return {
            itemImgListener: null,
            newRefresh: null,
        }
    },
    methods:{

    },
    mounted(){
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

        this.itemImgListener = () => {
            this.newRefresh()
            this.$router.go(0);
        }

        this.$bus.$on('itemImgLoad', this.itemImgListener)
    }
}
export const backTopMixin = {
    data(){
        return{
            isShowBackTop: false,
        }
    },
    components:{
        BackTop,
    },
    methods:{
        backTop(){
            this.$refs.scroll.scrollTo(0, 0, 300);
        },
        listenShowBackTop(position){
            this.isShowBackTop = -position.y > 1000;
        }
    }

}

