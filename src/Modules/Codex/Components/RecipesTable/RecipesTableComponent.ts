import {Component, Input}                         from '@angular/core';
import {BuildingsDataProvider, ItemsDataProvider} from '@modules/Codex/Service/DataProvider';
import {Constants}                                from '@src/Constants';
import {Formula}                                  from '@src/Formula';
import {IManufacturerSchema}                      from '@src/Schema/IBuildingSchema';
import {IItemSchema}                              from '@src/Schema/IItemSchema';
import {IRecipeSchema}                            from '@src/Schema/IRecipeSchema';
import {TrackBy}                                  from '@utils/TrackBy';
import {Observable}                               from 'rxjs';
import {concatMap, filter}                        from 'rxjs/operators';

@Component({
    selector:    'sf-recipes-table',
    templateUrl: './RecipesTableComponent.html'
})
export class RecipesTableComponent
{
    @Input() recipes: IRecipeSchema[];
    public readonly workshopClassName = Constants.WORKSHOP_CLASSNAME;
    public readonly workbenchClassName = Constants.WORKBENCH_CLASSNAME;

    constructor(private itemDataProvider: ItemsDataProvider, private buildingDataProvider: BuildingsDataProvider)
    {
    }

    public trackByCost = TrackBy.byItemAmountSchema;

    public resolveManufacturer(recipe: IRecipeSchema): Observable<IManufacturerSchema>
    {
        return this.buildingDataProvider.getAll().pipe(
            concatMap(x => x),
            filter((building: IManufacturerSchema) => recipe.producedIn[0] === building.className)
        );
    }

    public calculateProductAmountsPerMinute(building: IManufacturerSchema, recipe: IRecipeSchema, recipeProductAmount: number, overclock: number): number
    {
        const recipeTime = Formula.calculateBuildingRecipeProductionTime(recipe, building, overclock);

        return (60 / (recipe.time * (recipeTime / recipe.time))) * recipeProductAmount;
    }
}