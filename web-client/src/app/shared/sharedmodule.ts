import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import {  NgModule } from '@angular/core';
import { FullLayoutComponent } from './layout-components/full-layout/full-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FullscreenDirective } from './directives/fullscreen.directive';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { BacktotopComponent } from './components/backtotop/backtotop.component';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive';
import { SidemenuToggleDirective } from './directives/sidemenuToggle';
import { AuthService } from './services/auth.service';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FullLayoutComponent,
    SwitcherComponent,
    PageHeaderComponent,
    FullscreenDirective,
    FooterComponent,
    BacktotopComponent,
    ToggleThemeDirective,
    HoverEffectSidebarDirective,
    SidemenuToggleDirective,
    DeleteConfirmationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SimplebarAngularModule,
    ColorPickerModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ],

  exports: [
    FullLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    PageHeaderComponent,
    FullscreenDirective,
    FooterComponent,
    SidemenuToggleDirective,
    DeleteConfirmationComponent
  ],
  providers: [AuthService],
})
export class SharedModule {}
