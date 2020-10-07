import { Component } from '@angular/core';
import { FFModule } from 'ff-module-pp';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ff-angular';

  ffmodule = new FFModule(environment.featureFlagApi + '/flags/features', 60000);
}
