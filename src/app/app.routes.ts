import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { BlogFormComponent } from './blog/blog-form/blog-form.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = 
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'blog',
    },
    {
        path: 'blog',
        title: 'Blog',
        component: BlogComponent,
    },
    {
        path: 'blog-form',
        title: 'Blog Form',
        component: BlogFormComponent,
    },
    {
        path: 'blog-form/:blog',
        title: 'Blog Form',
        component: BlogFormComponent,
    },
    {
        path: 'form',
        title: 'Form',
        component: FormComponent,
    },
    { path: '*', redirectTo: 'blog', pathMatch: 'full' }
];
