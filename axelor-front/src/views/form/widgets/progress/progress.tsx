import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { Box, LinearProgress } from "@axelor/ui";

import { Schema } from "@/services/client/meta.types";

import { FieldControl, FieldProps } from "../../builder";

import styles from "./progress.module.scss";

// colors "r:24,y:49,b:74,g:100" -> [{code:'r', max:24}...]
type TransformColor = {
  code: string;
  max: number;
};

const transformColors = (colors: string) =>
  colors
    .split(/,/)
    .map((c) => c.split(/:/))
    .map(
      (c) =>
        ({
          code: c[0],
          max: Number(c[1]),
        } as TransformColor)
    )
    .sort((a, b) => a.max - b.max);

export function ProgressComponent({
  value,
  schema,
}: {
  value: number;
  schema: Schema;
}) {
  const progressProps = useMemo(() => {
    const { min = 0, max = 100, colors = "r:24,y:49,b:74,g:100" } = schema;

    const $value = Math.min(Math.round((+value * 100) / (max - min)), 100);
    const { code } = transformColors(colors).find((c) => $value <= c.max) || {
      code: "",
    };

    return { value: $value, className: styles[code] };
  }, [value, schema]);

  return <LinearProgress flex={1} {...progressProps} striped animated />;
}

export function Progress(props: FieldProps<number>) {
  const { schema, valueAtom } = props;
  const value = useAtomValue(valueAtom);
  return (
    <FieldControl {...props}>
      <Box className={styles.progress}>
        <ProgressComponent value={value || 0} schema={schema} />
      </Box>
    </FieldControl>
  );
}
