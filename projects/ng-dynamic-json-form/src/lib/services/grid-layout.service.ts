import { Injectable } from '@angular/core';
import { FormControlConfig } from '../models';

@Injectable()
export class GridLayoutService {
  /**
   * Auto set the other fields `gridColumn` when there's one or more field with `gridColumn` is specified.
   * By doing this, the other input fields will auto expand and their layout is not affected.
   * If there's children with `gridColumn` attribute found, set the parent's `gridTemplateColumns` attribute as well,
   * so that the grid layout will not shift.
   */
  setGridColumn(
    data: FormControlConfig[],
    parentTemplateColumns?: string
  ): void {
    const columnCount = !!parentTemplateColumns
      ? this._gridTemplateColumnCount(parentTemplateColumns)
      : this._maxGridColumn(data);

    for (const item of data) {
      const isFormGroup = !item.formArray && !!item.children?.length;
      const isFormArray = !isFormGroup && !!item.formArray?.template;

      if (!item.cssGrid?.gridColumn) {
        item.cssGrid = { ...item.cssGrid, gridColumn: `span ${columnCount}` };
      }

      // If this is FormGroup, then pass the children data in
      if (isFormGroup) {
        const children = item.children!;
        const columnCount = this._maxGridColumn(children);

        if (!item.cssGrid?.gridTemplateColumns) {
          item.cssGrid = {
            ...item.cssGrid,
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
          };
        }

        this.setGridColumn(children, item.cssGrid.gridTemplateColumns);
      }

      // If this is FormArray, then pass the template data in
      if (isFormArray) {
        this.setGridColumn(item.formArray!.template);
      }
    }
  }

  /**Find the max `gridColumn` value */
  private _maxGridColumn(data: FormControlConfig[]): number {
    /**Find all the `gridColumn` items that is set to `"span N"` || `"N"` */
    const gridColumnItems = data.filter((x) => {
      const hasGridColumnSet = !!x.cssGrid && !!x.cssGrid.gridColumn;
      if (!hasGridColumnSet) return false;

      return new RegExp(/^(span\s)\d+|\d+$/).test(x.cssGrid!.gridColumn!);
    });

    const maxGridColumnValue = gridColumnItems.reduce((max, curr) => {
      const gridColumn = curr?.cssGrid?.gridColumn || '1';
      const int = parseInt(gridColumn.replaceAll(/span/g, '').trim());
      return int > max ? int : max;
    }, 1);

    return maxGridColumnValue;
  }

  /**Parse `gridTemplateColumns` and get the total column amount */
  private _gridTemplateColumnCount(gridTemplateColumns: string): number {
    /**Get multiplier from `repeat(N, ...)` */
    const multiplier =
      gridTemplateColumns.includes('repeat') &&
      gridTemplateColumns.includes(',')
        ? gridTemplateColumns
            .split(/repeat\(\s*/)
            .join('')
            .split(',')
            .filter((x) => x.trim())[0]
        : '1';

    /**Get the number of `fr` */
    const columnCount =
      ([] as string[]).concat(
        ...(gridTemplateColumns.matchAll(/\d+(?=fr)/g) || [])
      ).length * parseInt(multiplier);

    return columnCount;
  }
}
