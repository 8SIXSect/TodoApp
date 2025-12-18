<template>
    <div class="flex min-h-screen flex-col">
        <div class="flex flex-col justify-center items-center flex-1">
            <slot name="centered-main-content"/>
        </div>

        <div class="flex-1">
            <slot name="uncentered-main-content"/>
        </div>

        <div>
            <slot name="footer"/>
        </div>
    </div>
</template>
