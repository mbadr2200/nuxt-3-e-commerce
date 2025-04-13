<template>
    <div class="flex flex-col min-h-screen">
        <BaseNav />
        <div class="container mx-auto px-4 py-8 flex-auto">
            <slot />
        </div>
        <BaseFooter class="w-full" />
    </div>
</template>