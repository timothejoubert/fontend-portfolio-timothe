import Vue from 'vue'
import { DefaultProps } from 'vue/types/options'
import { RoadizDocument } from '@roadiz/abstract-api-client/dist/types/roadiz'
import { EventsApi } from '~/types/event'

declare module '*.vue' {
    export default Vue
}

/**
 * fix CSS module
 * @see https://stackoverflow.com/a/53999913
 */
declare module 'vue/types/vue' {
    interface Vue {
        $style: { [key: string]: string }
        $documentURL(path: string | undefined): string
        $viewerLocation(document: RoadizDocument): Location
        $resourceUrl(path: string | undefined): string | undefined
        $eventDateURL(eventDate: EventsApi.EventDate): string | undefined | null
        $roadizURL(path: string): string
    }
}

declare module 'vue/types/options' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface RenderContext<Props = DefaultProps> {
        $style: { [key: string]: string }
    }
}
