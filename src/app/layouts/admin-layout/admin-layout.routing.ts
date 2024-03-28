import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CourseListComponent } from 'src/app/course-list/course-list.component';
import { CourseUpdateComponent } from 'src/app/course-update/course-update.component';
import { CourseFormComponent } from 'src/app/course-form/course-form.component';
import { StudentLayoutsComponent } from '../student-layouts/student-layouts.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'courlist',           component: CourseListComponent },
    { path: 'courupdate/:idCours',           component: CourseUpdateComponent },
    { path: 'couradd',           component: CourseFormComponent },
    { path: 'student',           component: StudentLayoutsComponent }

];
