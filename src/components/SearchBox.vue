<template>
    <div class="search-box">
            <i class="fa fa-search" aria-hidden="true"></i>
            <input placeholder="搜索歌曲、歌手、专辑" 
            v-model="keywords" 
            @keyup.enter="search"
            @input="inputting"
            />
            <i class="fa fa-times-circle" v-show="showdel" @click="clearWord"></i>
        </div>
</template>