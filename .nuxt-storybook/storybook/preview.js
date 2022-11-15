import Vue from 'vue'
import { prepareForInline } from './nuxt-entry';
import '~storybook';

import * as components from '../components';
Object.keys(components).forEach(name => Vue.component(name, components[name]));

const globalParameters = (function(a,b){return {viewport:{viewports:{iPhoneSE:{name:"iPhone SE",styles:{width:"375px",height:"660px"}},iPadPortrait:{name:"iPad portrait",styles:{width:a,height:b}},iPadLandscape:{name:"iPad landscape",styles:{width:b,height:a}}}}}}("768px","1024px"));
globalParameters.docs = {
    ...globalParameters.docs,
    prepareForInline
}
export const parameters = globalParameters

export const globalTypes = {}

export const decorators = []
