import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {NavComponent} from "./components/utils/nav/nav.component";
import {By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    const navComponentStub = {
      // Propiedades o métodos que necesitas del componente NavComponent
    };

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatButtonModule
      ],
      providers: [
        { provide: NavComponent, useValue: navComponentStub } // Si necesitas el mock
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'alianzaFront' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('alianzaFront');
  });

  it('should render the nav component', () => {
    const navElement = fixture.debugElement.query(By.directive(NavComponent));
    expect(navElement).toBeTruthy();
  });

  it('should render a toolbar', () => {
    const toolbarElement = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolbarElement).toBeTruthy();
  });
});
