import { defineConfig } from 'vitest/config'

export default defineConfig ({
    test: {
        environment:'jsdom',
        
        // purpose of this below is to make it, expect and describe accessible globally and not having to import them in each tests files
        globals:true
    }
})